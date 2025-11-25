import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || Constants.expoConfig?.extra?.supabaseAnonKey || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please configure SUPABASE_URL and SUPABASE_ANON_KEY in .env file.');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for common database operations
export const dbHelpers = {
  // Announcements
  async getAnnouncements(filters = {}) {
    let query = supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.type) query = query.eq('type', filters.type);
    if (filters.verified !== undefined) query = query.eq('verified', filters.verified);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createAnnouncement(announcement) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select();

    if (error) throw error;
    return data[0];
  },

  async updateAnnouncement(id, updates) {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Weather data
  async getWeatherData(location) {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('location', location)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  },

  // Events
  async getEvents(filters = {}) {
    let query = supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (filters.category) query = query.eq('category', filters.category);
    if (filters.upcoming) {
      query = query.gte('event_date', new Date().toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Alerts
  async getActiveAlerts() {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('active', true)
      .order('severity', { ascending: false });

    if (error) throw error;
    return data;
  },
};

export default supabase;
