import axios from "axios";
import { useAuthStore } from "../hooks/use-auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE + "/api/",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  config.headers.Authorization = "Bearer " + token;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      useAuthStore.getState().clearToken();
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }

    // reject with error if response status is not 403
    // return Promise.reject(error);
  }
);

export { api };
