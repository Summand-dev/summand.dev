import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isEmpty } from "lodash";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: "",
      refreshToken: "",
      expiresAt: "",
      user: null,
      setToken: (
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        user: any
      ) =>
        set((state) => ({
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
          user: user,
        })),
      validateToken: () => {
        const expiry = get().expiresAt;
        if (Date.now() > expiry) {
          console.log("Token expired");
          get().clearToken();
        }
      },
      clearToken: () =>
        set((state) => ({
          accessToken: "",
          refreshToken: "",
          expiresAt: 0,
          user: null,
        })),
      isAuthenticated: () => {
        get().validateToken();
        return !isEmpty(get().user);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
