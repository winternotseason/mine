import { create } from "zustand";

export type PageCounterState = {
  page: number;
  increasePageCounter: () => void;
  decreasePageCounter: () => void;
  pageSelector: (page: string) => void;
};

export const usePageCounterStore = create<PageCounterState>((set) => ({
  page: 1, // 초기 페이지 값
  increasePageCounter: () =>
    set((state) => ({
      page: state.page < 5 ? state.page + 1 : state.page,
    })),
  decreasePageCounter: () =>
    set((state) => ({
      page: state.page > 1 ? state.page - 1 : state.page,
    })),
  pageSelector: (page: string) =>
    set({
      page: +page,
    }),
}));
