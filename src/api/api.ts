import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});
