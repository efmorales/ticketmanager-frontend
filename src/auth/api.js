import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request config:", config);
  return config;
});

export default api;