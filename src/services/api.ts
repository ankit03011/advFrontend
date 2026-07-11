import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor for consistent error notifications
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || "Something went wrong. Please check your connection.";
    toast.error(message);
    return Promise.reject(error);
  }
);
export default api;
