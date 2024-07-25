import { create } from "zustand";

type ModalStore = {
  show: boolean;
  toggleModal: () => void;
};

export type address = {
  address_name: string;
  place_name: string;
  phone: string;
  location_x: string;
  location_y: string;
};

type AddressStore = {
  address: address;
  setAddress: (address: address) => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export const useAddressStore = create<AddressStore>()((set) => ({
  address: {
    address_name: "",
    place_name: "",
    phone: "",
    location_x: "",
    location_y: "",
  },
  setAddress: (address) =>
    set(() => ({
      address,
    })),
}));
