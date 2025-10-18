import axios from "axios";

// Create an Axios instance for your backend
const api = axios.create({
  baseURL: "http://localhost:8080/api", // <-- Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional: timeout after 5 seconds
});

// Optional: interceptors for logging or auth
api.interceptors.request.use(
  (config) => {
    // You can attach auth token here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    // console.log("Request:", config); // Commented to reduce console noise
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
