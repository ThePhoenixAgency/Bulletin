/**
 * AuthService - Gestion OAuth SSO/MFA (Supabase)
 * Providers : GitHub, Google, Microsoft, Azure.
 * Aucun secret en dur - utiliser process.env/github secrets.
 * @module services/AuthService
 */
import { createClient } from '@supabase/supabase-js';

// TODO: Décommentez et configurez avec vos vraies valeurs
/*
const supabase = createClient(
  'https://blfkhqsuqggpklsueolq.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
);
*/

const PROVIDERS = ['github', 'google', 'azure', 'microsoft'];

export const AuthService = {
  /**
   * Login MFA via OAuth
   * @param {string} provider - 'github'|'google'|'azure'|'microsoft'
   * @returns {Promise<Object|null>} Session data or null
   */
  async login(provider) {
    if (!PROVIDERS.includes(provider)) {
      throw new Error(`Provider invalide: ${provider}`);
    }
    // TODO: Décommentez pour activer
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider,
    //   options: { redirectTo: window.location.origin + '/auth/callback' }
    // });
    // if (error) throw error;
    // return data;
    return null;
  },

  /**
   * Logout user session
   * @returns {Promise<void>}
   */
  async logout() {
    // TODO: Décommentez pour activer
    // const { error } = await supabase.auth.signOut();
    // if (error) throw error;
  },

  /**
   * Récupère le profil user connecté
   * @returns {Promise<Object|null>} User object or null
   */
  async getProfile() {
    // TODO: Décommentez pour activer
    // const { data: { user }, error } = await supabase.auth.getUser();
    // if (error) throw error;
    // return user;
    return null;
  },

  /**
   * Écoute les changements d'état d'authentification
   * @param {Function} callback - Fonction appelée lors des changements
   * @returns {Object} Subscription object
   */
  onAuthStateChange(callback) {
    // TODO: Décommentez pour activer
    // return supabase.auth.onAuthStateChange((event, session) => {
    //   callback(event, session);
    // });
    return { unsubscribe: () => {} };
  },

  /**
   * Vérifie si l'utilisateur est admin/owner
   * @returns {Promise<boolean>}
   */
  async isAdmin() {
    const user = await this.getProfile();
    if (!user) return false;
    // TODO: Vérifier le rôle dans la table users Supabase
    // const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
    // return data?.role === 'admin' || data?.role === 'owner';
    return false;
  }
};

export default AuthService;
