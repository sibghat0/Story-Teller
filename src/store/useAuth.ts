// src/store/useAuth.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const TOKEN_KEY = 'USER_TOKEN';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;

  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<any>;
}

export const useAuth = create<AuthState>(set => ({
  user: null,
  token: null,
  loading: true,

  init: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ token, loading: false });
    } else {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token, user } = res.data;

      await AsyncStorage.setItem(TOKEN_KEY, access_token);

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      set({ token: access_token, user });

      return true;
    } catch {
      return false;
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { access_token, user } = res.data;

      await AsyncStorage.setItem(TOKEN_KEY, access_token);

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      set({ token: access_token, user });

      return true;
    } catch {
      return false;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];

    set({ token: null, user: null });
  },

  getProfile: async () => {
    try {
      const res = await api.get('/auth/profile');
      const user = res.data;
      set({ user });
      return { ok: true, user };
    } catch {
      return { ok: false, user: null };
    }
  },
}));
