import { create } from "zustand";

type ModalStore = {
  show: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type address = {
  address_name: string;
  place_name: string;
  phone: string;
  location_x: string;
  location_y: string;
  category: string;
};

type AddressStore = {
  address: address;
  setAddress: (address: address) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  show: false,
  openModal: () => set({ show: true }),
  closeModal: () => set({ show: false }),
}));

export const useAddressStore = create<AddressStore>()((set) => ({
  address: {
    address_name: "",
    place_name: "",
    phone: "",
    location_x: "",
    location_y: "",
    category: "",
  },
  setAddress: (address) =>
    set(() => ({
      address,
    })),
}));
