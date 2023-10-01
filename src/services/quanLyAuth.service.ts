import { FieldValues } from "react-hook-form";
import http from "../constant/api";
import {
  GetAuthResponse,
  GetHttpResponse,
  GetTokenResponse,
  ResponseByPage,
} from "../react-app-env";

export const quanLyAuthService = {
  dangKy: (payload: FieldValues) =>
    http.post<GetHttpResponse<GetAuthResponse>>("auth/signup", payload),
  dangNhap: (payload: FieldValues) =>
    http.post<GetHttpResponse<GetTokenResponse<GetAuthResponse>>>(
      "auth/signin",
      payload
    ),
  getUserInfor: (id: number) =>
    http.get<GetHttpResponse<GetAuthResponse>>(`users/${id}`),
  updateUser: (id: number, payload: FieldValues) =>
    http.put<GetHttpResponse<GetAuthResponse>>(`users/${id}`, payload),
  getUserWithPage: (query: string) =>
    http.get<GetHttpResponse<ResponseByPage<GetAuthResponse>>>(
      `users/phan-trang-tim-kiem?${query}`
    ),
  uploadAvatar: (payload: FormData) =>
    http.post<GetHttpResponse<GetAuthResponse>>("users/upload-avatar", payload),
  layDanhSachUser: () => http.get<GetHttpResponse<GetAuthResponse[]>>("users"),
  deleteUser : (id:number) => http.delete(`users?id=${id}`),
  postUser : (payload: FieldValues) =>
  http.post<GetHttpResponse<GetAuthResponse>>("users/", payload),
};
