import { create } from "zustand";
import DashboardIndex from "../../pages/dashboard/home";
import DashboardSetting from "../../pages/dashboard/setting";

export const pages = {
  "": {
    path: "/",
    title: "Dashboard",
    component: DashboardIndex,
  },
  setting: {
    title: "Settings",
    component: DashboardSetting,
  },
};

export const usePWAStore = create((set, get) => ({
  page: "",
  setPage: (page: string, query: string) => {
    set((state) => ({
      page: page,
    }));
    let addition = "";
    if (query === undefined) {
    } else if (query.length > 0) {
      addition = query;
    } else if (window.location.href.includes("?")) {
      addition = "?" + window.location.href.split("?")[1];
    }
    document.title = pages[page].title;
    window.history.pushState("", "", (pages[page].path || page) + addition);
  },
}));
