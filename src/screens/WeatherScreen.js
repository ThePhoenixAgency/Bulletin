import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { weatherService } from '../services/weatherService';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setError(null);
      const data = await weatherService.getCurrentWeather();
      setWeatherData(data);
    } catch (err) {
      setError('Impossible de charger les données météo');
      console.error('Weather load error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadWeather();
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: 'sunny',
      cloudy: 'cloudy',
      rainy: 'rainy',
      stormy: 'thunderstorm',
      snowy: 'snow',
      clear: 'moon',
    };
    return icons[condition?.toLowerCase()] || 'partly-sunny';
  };

  const getGradientColors = (condition) => {
    const gradients = {
      sunny: ['#FFD700', '#FF8C00'],
      cloudy: ['#778899', '#4682B4'],
      rainy: ['#4682B4', '#1E3A5F'],
      stormy: ['#2C3E50', '#34495E'],
      snowy: ['#E0E0E0', '#B0BEC5'],
      clear: ['#191970', '#4169E1'],
    };
    return gradients[condition?.toLowerCase()] || ['#87CEEB', '#4682B4'];
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Chargement de la météo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#E74C3C" />
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadWeather}>
          Réessayer
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={getGradientColors(weatherData?.condition)}
        style={styles.headerGradient}
      >
        <View style={styles.mainWeather}>
          <Ionicons
            name={getWeatherIcon(weatherData?.condition)}
            size={100}
            color="#FFF"
          />
          <Text style={styles.temperature}>{weatherData?.temperature}°C</Text>
          <Text style={styles.condition}>{weatherData?.condition}</Text>
          <Text style={styles.location}>{weatherData?.location}</Text>
        </View>
      </LinearGradient>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <DetailCard
            icon="water-outline"
            label="Humidité"
            value={`${weatherData?.humidity}%`}
          />
          <DetailCard
            icon="speedometer-outline"
            label="Pression"
            value={`${weatherData?.pressure} hPa`}
          />
        </View>

        <View style={styles.detailRow}>
          <DetailCard
            icon="eye-outline"
            label="Visibilité"
            value={`${weatherData?.visibility} km`}
          />
          <DetailCard
            icon="navigate-outline"
            label="Vent"
            value={`${weatherData?.windSpeed} km/h`}
          />
        </View>

        <View style={styles.detailRow}>
          <DetailCard
            icon="sunny-outline"
            label="Indice UV"
            value={weatherData?.uvIndex}
          />
          <DetailCard
            icon="thermometer-outline"
            label="Ressenti"
            value={`${weatherData?.feelsLike}°C`}
          />
        </View>
      </View>

      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>Prévisions 7 jours</Text>
        {weatherData?.forecast?.map((day, index) => (
          <View key={index} style={styles.forecastDay}>
            <Text style={styles.forecastDate}>{day.date}</Text>
            <Ionicons
              name={getWeatherIcon(day.condition)}
              size={32}
              color="#4A90E2"
            />
            <Text style={styles.forecastTemp}>
              {day.maxTemp}° / {day.minTemp}°
            </Text>
            <Text style={styles.forecastCondition}>{day.condition}</Text>
          </View>
        ))}
      </View>

      {weatherData?.alerts && weatherData.alerts.length > 0 && (
        <View style={styles.alertsContainer}>
          <Text style={styles.alertsTitle}>Alertes météo</Text>
          {weatherData.alerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <Ionicons name="warning-outline" size={24} color="#E74C3C" />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDescription}>{alert.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <View style={styles.detailCard}>
      <Ionicons name={icon} size={32} color="#4A90E2" />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#E74C3C',
    textAlign: 'center',
  },
  retryText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  mainWeather: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 16,
  },
  condition: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 8,
    fontWeight: '500',
  },
  location: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 4,
    opacity: 0.9,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  forecastContainer: {
    padding: 16,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  forecastDay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  forecastDate: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  forecastTemp: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginHorizontal: 12,
  },
  forecastCondition: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  alertsContainer: {
    padding: 16,
  },
  alertsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 16,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
