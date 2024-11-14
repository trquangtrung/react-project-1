import axios from "axios";
import { BASE_URL } from "../constants/environments";
import tokenMethod from "./token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("config", config);
    // config.headers["Content-Type"] = "application/json";
    // if (config.url.includes("/customer/profiles")) {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    // }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // status code: 200 ~ 299 => success
    // console.log("response", response);
    return response;
  },
  async (error) => {
    console.log("Response error:", error);
    const originalRequest = error.config;
    if (
      error.response?.status &&
      [401, 403].includes(error.response?.status) &&
      !originalRequest._retry
    ) {
      // accessToken is expried
      // Refresh Token
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.get(`/customer/refresh`, {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res?.data?.data || {};
        // Lưu token vào client storage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Gọi lại API bị lỗi
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("error", error);
        // User logout và login lại
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
