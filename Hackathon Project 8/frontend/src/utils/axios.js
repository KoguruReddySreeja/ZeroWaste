import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // change as needed
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Fixed the template string issue
  }
  return config;
});

export default instance;