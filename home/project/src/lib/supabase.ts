import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  storage: {
    // Forcer le stockage à utiliser les URLs publiques
    storageBaseURL: `${supabaseUrl}/storage/v1`
  }
});

// Fonction utilitaire pour tester la connexion au stockage
export const testStorageConnection = async () => {
  try {
    const { data, error } = await supabase.storage.getBucket('inventory');
    if (error) {
      console.error('Storage connection error:', error);
      return false;
    }
    console.log('Storage connection successful:', data);
    return true;
  } catch (err) {
    console.error('Storage test failed:', err);
    return false;
  }
};