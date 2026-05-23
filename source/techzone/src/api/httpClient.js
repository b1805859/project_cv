import axios from "axios";
import { API_CONFIG } from "./config";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Auto-attach Bearer token if it exists
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      if (config.headers) {
        delete config.headers['Content-Type'];
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Extract data and normalize errors
httpClient.interceptors.response.use(
  (response) => {
    const apiResponse = response.data;
    // Spring Boot returns success field in the ApiResponse wrapper
    if (apiResponse && apiResponse.success !== false) {
      return apiResponse; // Returns { success, message, data }
    }
    return Promise.reject(new Error(apiResponse.message || "Có lỗi xảy ra!"));
  },
  (error) => {
    let normalizedError = {
      message: "Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền!",
      status: 500,
      code: "NETWORK_ERROR",
    };

    if (error.response) {
      const serverResponse = error.response.data;
      normalizedError = {
        message: serverResponse?.message || "Có lỗi xảy ra từ máy chủ.",
        status: error.response.status,
        code: serverResponse?.code || "SERVER_ERROR",
      };

      // Redirect or log out if unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        window.dispatchEvent(new Event("auth_session_expired"));
      }
    }
    return Promise.reject(normalizedError);
  },
);

export default httpClient;
