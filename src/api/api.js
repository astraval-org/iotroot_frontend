import axios from "axios";
import { getToken } from "../utils/auth";

// Create an Axios instance for your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <-- Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional: timeout after 5 seconds
});

// Optional: interceptors for logging or auth
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response); // Commented to reduce console noise
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
