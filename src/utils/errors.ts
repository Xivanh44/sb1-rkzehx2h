import type { AuthError } from '@supabase/supabase-js';

export class AuthenticationError extends Error {
  constructor(message: string, public originalError?: AuthError) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function handleAuthError(error: unknown): Error {
  console.error('Auth error:', error);

  if (error instanceof AuthenticationError) {
    return error;
  }

  const authError = error as AuthError;
  const message = authError.message?.toLowerCase() || '';

  if (message.includes('network')) {
    return new AuthenticationError(
      'Problème de connexion. Vérifiez votre connexion internet.'
    );
  }

  if (message.includes('invalid')) {
    return new AuthenticationError(
      'Email ou mot de passe incorrect'
    );
  }

  if (message.includes('schema')) {
    return new AuthenticationError(
      'Erreur de configuration. Veuillez réessayer.'
    );
  }

  return new AuthenticationError(
    'Une erreur est survenue. Veuillez réessayer.'
  );
}