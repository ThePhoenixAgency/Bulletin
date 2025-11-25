import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, RefreshControl, Alert, Badge } from 'react-native';
import { dbHelpers } from '../config/supabase';
import { initializeNotifications } from '../services/notificationService';

/**
 * AlertsScreen - Système d'alertes et notifications
 * Affiche les alertes météo, trafic et sécurité en temps réel
 */
export default function AlertsScreen({ navigation }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterLevel, setFilterLevel] = useState('all');

  const levels = ['all', 'critical', 'warning', 'info'];
  const levelColors = {
    critical: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
  };

  // Charger les alertes
  useEffect(() => {
    loadAlerts();
    // S'abonner aux notifications
    const unsubscribe = initializeNotifications();
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [filterLevel]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const query = dbHelpers.getAlerts({ active: true });
      
      if (filterLevel !== 'all') {
        query.filter('level', 'eq', filterLevel);
      }

      const data = await query;
      // Trier par priorité
      const sorted = data.sort((a, b) => {
        const priority = { critical: 3, warning: 2, info: 1 };
        return (priority[b.level] || 0) - (priority[a.level] || 0);
      });
      setAlerts(sorted || []);
    } catch (error) {
      console.error('Failed to load alerts:', error);
      Alert.alert('Erreur', 'Impossible de charger les alertes');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlerts();
    setRefreshing(false);
  };

  const handleAlertPress = (alert) => {
    Alert.alert(
      alert.title,
      `${alert.message}\n\nValide jusqu'à: ${alert.validUntil}`,
      [
        { text: 'Fermer', onPress: () => {} },
        { 
          text: 'Marquer comme lue', 
          onPress: () => markAlertAsRead(alert.id)
        },
      ]
    );
  };

  const markAlertAsRead = async (alertId) => {
    try {
      await dbHelpers.updateAlert(alertId, { read: true });
      loadAlerts();
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
    }
  };

  const renderAlertItem = ({ item: alert }) => {
    const bgColor = levelColors[alert.level] || '#007AFF';
    return (
      <TouchableOpacity
        style={[styles.alertCard, { borderLeftColor: bgColor }]}
        onPress={() => handleAlertPress(alert)}
        activeOpacity={0.7}
      >
        <View style={[styles.alertIcon, { backgroundColor: bgColor }]}>
          <Text style={styles.iconText}>
            {alert.level === 'critical' ? '⚠️' : alert.level === 'warning' ? '⚠' : 'i'}
          </Text>
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle} numberOfLines={1}>{alert.title}</Text>
          <Text style={styles.alertMessage} numberOfLines={2}>{alert.message}</Text>
          <Text style={styles.alertTime}>{alert.timestamp}</Text>
        </View>
        {!alert.read && <View style={styles.unreadBadge} />}
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement des alertes...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alertes</Text>
        <Text style={styles.headerSubtitle}>Notifications en temps réel</Text>
      </View>

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.filterButton, filterLevel === level && styles.filterButtonActive]}
            onPress={() => setFilterLevel(level)}
          >
            <Text
              style={[
                styles.filterText,
                filterLevel === level && styles.filterTextActive,
              ]}
            >
              {level === 'all' ? 'Tous' : level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alerts List */}
      {alerts.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={alerts}
          renderItem={renderAlertItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.alertsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>✔️ Tout est calme!</Text>
          <Text style={styles.emptySubtext}>Aucune alerte pour le moment</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FF3B30',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffe0e0',
    marginTop: 5,
  },
  filtersScroll: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#FF3B30',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  alertsList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  alertIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  alertTime: {
    fontSize: 11,
    color: '#999',
  },
  unreadBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27AE60',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
