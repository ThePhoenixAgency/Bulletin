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
  process.env.URL,
  process.env.SERVICE_KEY
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

    /**
   * Envoie un SMS via l'API SMS-TextBelt-API
   * @see https://github.com/ThePhoenixAgency/SMS-TextBelt-API
   * @param {string} phoneNumber - Numero de telephone
   * @param {string} message - Message a envoyer
   * @param {string} carrier - Operateur mobile (optionnel)
   * @returns {Promise<Object>} Resultat de l'envoi
   */
  async sendSMS(phoneNumber, message, carrier = null) {
    // TODO: Configurer SMS_TEXTBELT_API_URL dans les GitHub Secrets
    const SMS_API_URL = process.env.SMS_TEXTBELT_API_URL || 'http://localhost:9090';
    
    try {
      const response = await fetch(`${SMS_API_URL}/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: phoneNumber,
          message: message,
          ...(carrier && { carrier }),
        }),
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur SMS-TextBelt-API:', error);
      throw error;
    }
  },

  /**
   * Envoie un code OTP par SMS pour verification
   * @param {string} phoneNumber - Numero de telephone
   * @returns {Promise<Object>} Code OTP genere et resultat envoi
   */
  async sendOTP(phoneNumber) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const message = `Votre code de verification Bulletin est: ${otp}`;
    
    const result = await this.sendSMS(phoneNumber, message);
    
    // TODO: Stocker le code OTP dans Supabase pour verification ulterieure
    // await supabase.from('otp_codes').insert({ phone: phoneNumber, code: otp, expires_at: ... });
    
    return { ...result, otp };
  },

  /**
   * Verifie un code OTP
   * @param {string} phoneNumber - Numero de telephone
   * @param {string} code - Code OTP saisi
   * @returns {Promise<boolean>} True si code valide
   */
  async verifyOTP(phoneNumber, code) {
    // TODO: Implementer la verification avec Supabase
    // const { data } = await supabase.from('otp_codes')
    //   .select('*')
    //   .eq('phone', phoneNumber)
    //   .eq('code', code)
    //   .gt('expires_at', new Date().toISOString())
    //   .single();
    // return !!data;
    return false;
  },
};

export default AuthService;
