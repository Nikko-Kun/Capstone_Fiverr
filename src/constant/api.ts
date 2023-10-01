import axios from "axios";

const http = axios.create();
const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc";
const baseURL = "https://fiverrnew.cybersoft.edu.vn/api/";
const token = JSON.parse(localStorage.getItem("user") as string)?.token;
http.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      TokenCybersoft,
      token,
    },
    baseURL,
  };
});

export default http;
