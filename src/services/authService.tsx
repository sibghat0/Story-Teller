import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = 'USER_TOKEN';

const authService = {
  isLoggedIn: false,
  access_token: null as string | null,
  user: null,

  loadToken: async () => {
    try {
      const access_token = await AsyncStorage.getItem(TOKEN_KEY);
      if (access_token) {
        authService.access_token = access_token;
        authService.isLoggedIn = true;
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return access_token;
      }
      return null;
    } catch (err: any) {
      console.log('loadToken error:', err);
      return null;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token, user } = res.data;

      await AsyncStorage.setItem(TOKEN_KEY, access_token);
      authService.access_token = access_token;
      authService.user = user;
      authService.isLoggedIn = true;

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return { ok: true, user };
    } catch (err: any) {
      return { ok: false, error: err?.response?.data || err.message };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { access_token, user } = res.data;

      await AsyncStorage.setItem(TOKEN_KEY, access_token);
      authService.access_token = access_token;
      authService.user = user;
      authService.isLoggedIn = true;

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return { ok: true, user };
    } catch (err: any) {
      return { ok: false, error: err?.response?.data || err.message };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      authService.access_token = null;
      authService.user = null;
      authService.isLoggedIn = false;

      delete api.defaults.headers.common['Authorization'];
      return true;
    } catch (err: any) {
      console.log('logout error:', err);
      return false;
    }
  },

  getProfile: async () => {
    try {
      const access_token = authService.access_token;

      if (!access_token) {
        return { ok: false, error: 'Not authenticated' };
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const res = await api.get('/auth/profile');

      const user = res.data;
      authService.user = user;

      return { ok: true, user };
    } catch (err: any) {
      return { ok: false, error: err?.response?.data || err.message };
    }
  },
};

export default authService;
