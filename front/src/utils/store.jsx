import { create } from "zustand";

const useStore = create((set) => ({
  selectOrder: null,
  setSelectOrder: (order) => set({ selectOrder: order }),

  listSelect: [],
  setListSelect: (select) => set({ listSelect: select }),

  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  viewCategory: true,
  setViewCategory: (value) => set({ viewCategory: value }),

  ordersAdmin: [],
  setOrdersAdmin: (value) => set({ ordersAdmin: value }),
}));

export default useStore;
