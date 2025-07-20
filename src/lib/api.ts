import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://mauelbackend-1.onrender.com/api",
  withCredentials: true, // Allow cookies/credentials
});

// Intercept requests to inject token if available
API.interceptors.request.use((req) => {
  try {
    const userStr = localStorage.getItem("user");

    // Ensure the string exists and is not literally "undefined"
    if (userStr && userStr !== "undefined") {
      const user = JSON.parse(userStr);
      const token = user?.token;

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (err) {
    console.error("❌ Error parsing user from localStorage:", err);
    // Optional: you may remove corrupted data
    localStorage.removeItem("user");
  }

  return req;
});

export default API;
