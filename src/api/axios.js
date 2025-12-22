import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  timeout: 60000, // 60초 (AI 분석은 시간이 오래 걸릴 수 있음)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});