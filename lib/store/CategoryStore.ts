import { create } from "zustand";

type CategoryStore = {
  category: string;
  setCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
