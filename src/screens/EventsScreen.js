import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { dbHelpers } from '../config/supabase';

/**
 * EventsScreen - Événements locaux et manifestations
 * Affiche les événements à proximité avec filtres et recherche
 */
export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'sports', 'culture', 'business', 'entertainment'];

  // Charger les événements
  useEffect(() => {
    loadEvents();
  }, [selectedCategory]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const query = dbHelpers.getEvents({ verified: true });
      
      if (selectedCategory !== 'all') {
        query.filter('category', 'eq', selectedCategory);
      }

      const data = await query;
      setEvents(data || []);
    } catch (error) {
      console.error('Failed to load events:', error);
      Alert.alert('Erreur', 'Impossible de charger les événements');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event) => {
    Alert.alert(
      event.title,
      `${event.location}\n${event.date}\n\n${event.description}`,
      [
        { text: 'Fermer', onPress: () => {} },
        { text: 'Plus d\'infos', onPress: () => navigation.navigate('EventDetails', { eventId: event.id }) },
      ]
    );
  };

  const renderEventItem = ({ item: event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(event)}
      activeOpacity={0.7}
    >
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
        <Text style={styles.eventDate}>📅 {event.date}</Text>
        <Text style={styles.eventCategory}>{event.category.toUpperCase()}</Text>
      </View>
      <Text style={styles.eventArrow}>→</Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement des événements...</Text>
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
        <Text style={styles.headerTitle}>Événements Locaux</Text>
        <Text style={styles.headerSubtitle}>Découvrez ce qui se passe près de vous</Text>
      </View>

      {/* Filter Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      {events.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.eventsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun événement trouvé</Text>
          <Text style={styles.emptySubtext}>Essayez une autre catégorie</Text>
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
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  categoriesScroll: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  eventsList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  eventCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  eventArrow: {
    fontSize: 20,
    color: '#007AFF',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
