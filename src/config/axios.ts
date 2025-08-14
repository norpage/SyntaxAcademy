import axios from "axios";

let runtimeToken: string | null = null;
export const setAuthToken = (token: string | null) => { runtimeToken = token; };

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
// Կարող ես նաև անել՝
// if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  let token = runtimeToken;
  if (!token && typeof window !== "undefined") {
    try { token = localStorage.getItem("token"); } catch {}
  }
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg = error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message || "Request failed";
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("api-error", { detail: msg }));
    }
    return Promise.reject(error);
  }
);

export default api;
