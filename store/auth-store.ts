import { create } from "zustand";

export type AuthState = {
  isAuthenticated: boolean;
  loginHandler: () => void;
  logoutHandler: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loginHandler: () => set({ isAuthenticated: true }),
  logoutHandler: () => set({ isAuthenticated: false }),
}));
