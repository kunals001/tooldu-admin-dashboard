import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type Admin = {
  name: string;
  email: string;
  isAdmin: boolean;
};

interface AuthState {
  admin: Admin | null;
  loading: boolean;         // used for login/logout
  checkingAuth: boolean;    // specifically for checkAuth
  login: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  loading: false,
  checkingAuth: false,

  login: async (name: string, email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_URI}/login`, {
        name,
        email,
        password,
      });
      set({ admin: response.data, loading: false });
    } catch (error) {
      console.error("Login error:", error);
      set({ admin: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URI}/logout`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      set({ admin: null });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get(`${API_URI}/check-auth`);
      set({ admin: response.data });
    } catch (error) {
      console.error("CheckAuth error:", error);
      set({ admin: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
