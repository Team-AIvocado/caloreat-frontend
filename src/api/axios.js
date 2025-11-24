import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
