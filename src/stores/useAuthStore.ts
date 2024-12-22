import { create } from 'zustand';
import type { Profile } from '../types';

interface AuthState {
  profile: Profile;
}

// Create a mock authenticated state with manager role
export const useAuthStore = create<AuthState>(() => ({
  profile: {
    id: 'mock-user',
    hotel_id: null,
    role: 'manager'
  }
}));