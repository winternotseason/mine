import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BasketItem = {
  product_name: string;
  price: string;
  amount: number;
};

export type BasketState = {
  basket_items: BasketItem[];
  addItem: (item: Omit<BasketItem, "amount">) => void;
  removeItem: (product_name: string) => void;
  allRemoveItem: () => void;
  removeSelectedItems: (selectedItems: { [key: string]: boolean }) => void;
  increaseItemsAmount: (product_name: string) => void;
  decreaseItemsAmount: (product_name: string) => void;
};

export const useBasketStore = create<BasketState>()(
  persist(
    (set) => ({
      basket_items: [],
      addItem: (item) =>
        set((state) => {
          // 이미 같은 아이템이 장바구니에 존재하는가?
          const existingItemIndex = state.basket_items.findIndex(
            (i) => i.product_name === item.product_name
          );
          // 만약에 없으면?
          if (existingItemIndex !== -1) {
            // amount를 늘리는거지
            const updatedBasketItems = [...state.basket_items];
            updatedBasketItems[existingItemIndex] = {
              ...updatedBasketItems[existingItemIndex],
              amount: updatedBasketItems[existingItemIndex].amount + 1,
            };
            return { basket_items: updatedBasketItems };
          } else {
            // 기존 항목이 없는 경우 새 항목 추가
            return {
              basket_items: [...state.basket_items, { ...item, amount: 1 }],
            };
          }
        }),
      removeItem: (product_name) =>
        set((state) => ({
          basket_items: state.basket_items.filter(
            (item) => item.product_name !== product_name
          ),
        })),
      allRemoveItem: () => set({ basket_items: [] }),
      removeSelectedItems: (selectedItems) =>
        set((state) => ({
          basket_items: state.basket_items.filter(
            (item) => !selectedItems[item.product_name]
          ),
        })),
      increaseItemsAmount: (product_name) =>
        set((state) => {
          const updatedBasketItems = state.basket_items.map((item) =>
            item.product_name === product_name
              ? { ...item, amount: item.amount + 1 }
              : item
          );
          return { basket_items: updatedBasketItems };
        }),
      decreaseItemsAmount: (product_name) =>
        set((state) => {
          const updatedBasketItems = state.basket_items.map((item) =>
            item.product_name === product_name
              ? {
                  ...item,
                  amount: item.amount === 0 ? item.amount : item.amount - 1,
                }
              : item
          );
          return { basket_items: updatedBasketItems };
        }),
    }),
    {
      name: "basket-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/* 그니까 만약에 들어온 상품에 기존 항목이 없다? 그러면 항목 자체를 추가 : amount:1인 상태로
만약에 기존 항목이 있다? 그러면 amount를 2로 올림.*/
