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

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

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

    const originalRequest = error.config;

    if (error.response) {
      const serverResponse = error.response.data;
      normalizedError = {
        message: serverResponse?.message || "Có lỗi xảy ra từ máy chủ.",
        status: error.response.status,
        code: serverResponse?.code || "SERVER_ERROR",
      };

      // Try refresh flow on 401
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((token) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(httpClient(originalRequest));
              } else {
                reject(normalizedError);
              }
            });
          });
        }

        isRefreshing = true;

        return axios.post("/auth/refresh", {}, { baseURL: httpClient.defaults.baseURL, withCredentials: true })
          .then((res) => {
            const newToken = res.data?.data?.token;
            if (newToken) {
              localStorage.setItem("accessToken", newToken);
              onRefreshed(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return httpClient(originalRequest);
            }
            // fallback: clear session
            localStorage.removeItem("accessToken");
            localStorage.removeItem("currentUser");
            window.dispatchEvent(new Event("auth_session_expired"));
            return Promise.reject(normalizedError);
          })
          .catch((err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("currentUser");
            window.dispatchEvent(new Event("auth_session_expired"));
            onRefreshed(null);
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }

    return Promise.reject(normalizedError);
  },
);

export default httpClient;
