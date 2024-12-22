import { supabase } from '../config/supabase';
import type { AuthError } from '@supabase/supabase-js';
import { AuthenticationError } from '../utils/errors';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data?.user) throw new Error('No user data');

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile) throw new Error('No profile found');

    return { user: data.user, profile };
  } catch (error) {
    console.error('Auth error:', error);
    if ((error as AuthError).message?.includes('schema')) {
      throw new AuthenticationError(
        'Erreur de configuration. Veuillez contacter le support.',
        error as AuthError
      );
    }
    throw new AuthenticationError(
      'Email ou mot de passe incorrect',
      error as AuthError
    );
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}