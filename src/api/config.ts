import { supabase } from "@/utils/supabase";
import axios, { type InternalAxiosRequestConfig } from "axios";

import { toast } from "sonner";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 8000000,
});

instance.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        //  Authorization: `Bearer ${localStorage.getItem("zensset_token")}`,
        //  "z-uid": localStorage.getItem("zensset_uid"),
        //  "z-wid": localStorage.getItem("zensset_wid"),
      } as InternalAxiosRequestConfig["headers"],
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    if (response.data.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      supabase.auth.signOut();
    }

    toast.error(error.response.data.message);

    return Promise.reject({
      message: error.response.data.message,
      statusCode: error.response.status,
    });
  }
);

export default instance;
