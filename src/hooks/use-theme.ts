import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  dark: true,
  setDark: (dark) => {
    localStorage.setItem("dark-mode", dark);
    set((state) => ({
      dark: dark,
    }));
  },
}));
