import { create } from "zustand";

type User = {
  id: string;
  name: string;
  selectedAvatar: number;
};

type UserStore = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) =>
    set(() => ({
      user,
    })),
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set(() => ({
      isAuthenticated,
    })),
}));
