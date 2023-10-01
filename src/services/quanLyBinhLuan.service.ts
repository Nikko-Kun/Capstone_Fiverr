import { FieldValues } from "react-hook-form";
import http from "../constant/api";
import {
  AddBinhLuanResponse,
  BinhLuanResponse,
  GetHttpResponse,
} from "../react-app-env";

export const quanLyBinhLuanService = {
  layBinhLuanTheoCongViec: (id: number) =>
    http.get<GetHttpResponse<BinhLuanResponse[]>>(
      `binh-luan/lay-binh-luan-theo-cong-viec/${id}`
    ),
  layBinhLuan: (id: number) =>
    http.get<GetHttpResponse<AddBinhLuanResponse>>(`binh-luan/${id}`),
  addBinhLuan: (payload: FieldValues) =>
    http.post<GetHttpResponse<AddBinhLuanResponse>>("binh-luan", payload),
  editBinhLuan: (payload: FieldValues, id: number) =>
    http.put<GetHttpResponse<AddBinhLuanResponse>>(`binh-luan/${id}`, payload),
  deleteBinhLuan: (id: number) => http.delete(`binh-luan/${id}`),
};
