import { create } from 'zustand';
import type { User } from '../types';
import { getCurrentUser, loginUser, registerUser, logoutUser, seedAdmin } from '../utils/db';

interface AuthState {
  user: User | null;
  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialize: () => {
    seedAdmin();
    const u = getCurrentUser();
    set({ user: u });
  },
  login: async (email, password) => {
    const u = loginUser(email, password);
    set({ user: u });
  },
  register: async (email, password, name) => {
    const u = registerUser(email, password, name);
    set({ user: u });
  },
  logout: () => {
    logoutUser();
    set({ user: null });
  },
}));
