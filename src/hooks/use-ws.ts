import { create } from "zustand";

export const useWSStore = create((set, get) => ({
  stats: {},
  setStats: (stats) => {
    set((state) => ({
      stats: stats,
    }));
  },
}));
