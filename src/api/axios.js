import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://techproinstitute.org/api",
});

// Add a request interceptor to include token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;