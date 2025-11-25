import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import TrafficScreen from './src/screens/TrafficScreen';
import EventsScreen from './src/screens/EventsScreen';
import AlertsScreen from './src/screens/AlertsScreen';

// Services
import { initializeNotifications } from './src/services/notificationService';
import { supabase } from './src/config/supabase';

const Tab = createBottomTabNavigator();

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    // Initialize push notifications
    initializeNotifications();

    // Check Supabase connection
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('system_health').select('*').limit(1);
        if (error) console.log('Supabase connection check:', error.message);
        else console.log('✓ Supabase connected successfully');
      } catch (err) {
        console.log('Supabase connection error:', err);
      }
    };

    checkConnection();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          headerShown: true,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Bulletin',
          }}
        />
        <Tab.Screen 
          name="Weather" 
          component={WeatherScreen}
          options={{
            title: 'Météo',
          }}
        />
        <Tab.Screen 
          name="Traffic" 
          component={TrafficScreen}
          options={{
            title: 'Trafic',
          }}
        />
        <Tab.Screen 
          name="Events" 
          component={EventsScreen}
          options={{
            title: 'Événements',
          }}
        />
        <Tab.Screen 
          name="Alerts" 
          component={AlertsScreen}
          options={{
            title: 'Alertes',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
