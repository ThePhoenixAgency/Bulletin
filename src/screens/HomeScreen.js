import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { dbHelpers } from '../config/supabase';
import aiService from '../services/aiService';

export default function HomeScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await dbHelpers.getAnnouncements({ verified: true });
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Failed to load announcements:', error);
      Alert.alert('Error', 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnnouncements();
    setRefreshing(false);
  };

  const handleAnnouncementPress = (announcement) => {
    Alert.alert(
      announcement.title,
      announcement.content,
      [{ text: 'OK' }]
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bulletin</Text>
        <Text style={styles.subtitle}>Stay informed about everything</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.actionIcon}>☀️</Text>
          <Text style={styles.actionText}>Weather</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Traffic')}
        >
          <Text style={styles.actionIcon}>🚗</Text>
          <Text style={styles.actionText}>Traffic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Events')}
        >
          <Text style={styles.actionIcon}>🎉</Text>
          <Text style={styles.actionText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Alerts')}
        >
          <Text style={styles.actionIcon}>⚠️</Text>
          <Text style={styles.actionText}>Alerts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Announcements</Text>
        {announcements.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No announcements yet</Text>
          </View>
        ) : (
          announcements.map((announcement) => (
            <TouchableOpacity
              key={announcement.id}
              style={styles.announcementCard}
              onPress={() => handleAnnouncementPress(announcement)}
            >
              <View style={styles.announcementHeader}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                {announcement.verified && (
                  <Text style={styles.verifiedBadge}>✓ Verified</Text>
                )}
              </View>
              <Text style={styles.announcementContent} numberOfLines={2}>
                {announcement.content}
              </Text>
              <Text style={styles.announcementMeta}>
                {announcement.type} • {new Date(announcement.created_at).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  announcementCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  announcementContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  announcementMeta: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
