import { AxiosRequestConfig } from "axios";
import apiFacade from "./config";

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiFacade.get<T>(url, config);
  },

  post: async <T>(url: string, data: unknown, config?: AxiosRequestConfig) => {
    return await apiFacade.post<T>(url, data, config);
  },

  patch: async <T>(url: string, data: unknown, config?: AxiosRequestConfig) => {
    return await apiFacade.patch<T>(url, data, config);
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiFacade.delete<T>(url, config);
  },
};

export default api;
