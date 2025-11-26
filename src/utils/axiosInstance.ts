// api/axiosInstance.ts
import axios from "axios";
import { isTokenExpired } from "../utils/tokenValidate";
import BASE_URL_JOB from "../config/config";

const API = axios.create({
  baseURL: BASE_URL_JOB,
});

// A helper: get ANY token from storage
const getAnyToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("employeeToken") ||
    localStorage.getItem("employerToken") ||
    localStorage.getItem("token")
  );
};

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = getAnyToken();

    // If token missing or expired → redirect
    if (!token || isTokenExpired(token)) {
      localStorage.clear();           // remove all tokens
      window.location.href = "/login";
      return Promise.reject("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && error?.response?.status === 403 ) {
      localStorage.clear();           // remove all tokens
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
