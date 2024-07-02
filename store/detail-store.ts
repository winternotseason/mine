import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DetailItem = {
  link: string;
  title: string;
  image: string;
  category: string;
  price: string;
  mallName: string;
};

export type DetailItemState = {
  Item: DetailItem | null;
  setDetailItem: (Item: DetailItem) => void;
};
// 현재 누른 상품에 link, 타이틀, 이미지, 카테고리, 가격 넣어서 저장.
// product => 동적 라우트 안함

export const useDetailItemStore = create<DetailItemState>()(
  persist(
    (set) => ({
      Item: {
        link: "",
        title: "",
        image: "",
        category: "",
        price: "",
        mallName: "",
      },
      setDetailItem: (newItem: DetailItem) => set({ Item: newItem }),
    }),
    {
      name: "detail-item-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지를 사용
    }
  )
);
