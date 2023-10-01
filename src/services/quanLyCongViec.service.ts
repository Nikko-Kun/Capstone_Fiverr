import { FieldValues } from "react-hook-form";
import http from "../constant/api";
import { GetCongViecResponse, GetHttpResponse ,GetTypeWorkResponse ,MenuTypeWork,GroupDetailTypeWork, ThueCongViecResponse, ResponseByPage, HireWorkOfUserResponse} from "../react-app-env";

export const quanLyCongViecService = {
  layDanhSachCongViec: () =>
    http.get<GetHttpResponse<GetCongViecResponse[]>>("cong-viec"),
  layChiTietCongViec: (id: number) =>
    http.get<GetHttpResponse<GetCongViecResponse>>(`cong-viec/${id}`),
  getChiTietLoaiCongViec : () => http.get<GetHttpResponse<GroupDetailTypeWork[]>>("chi-tiet-loai-cong-viec"),
  detailChiTietLoaiCongViec : (id: number) => http.get<GetHttpResponse<GroupDetailTypeWork>>(`chi-tiet-loai-cong-viec/${id}`),
  getMenuChiTietCongViec : () => http.get<GetHttpResponse<MenuTypeWork[]>>("cong-viec/lay-menu-loai-cong-viec"),
  getLoaiCongViec : () => http.get<GetHttpResponse<GetTypeWorkResponse[]>>("loai-cong-viec"),
  detailLoaiCongViec : (id: number) => http.get<GetHttpResponse<GetTypeWorkResponse>>(`loai-cong-viec/${id}`),
  addThueCongViec: (cv: FieldValues) => http.post<GetHttpResponse<ThueCongViecResponse>>("thue-cong-viec", cv),
  getAllHireWork : () => http.get<GetHttpResponse<ThueCongViecResponse[]>>("thue-cong-viec"),
  getHireWorkWithPage : (query:string) => http.get<GetHttpResponse<ResponseByPage<ThueCongViecResponse>>>(`thue-cong-viec/phan-trang-tim-kiem?${query}`),
  getDetailHireWork : (id:number) => http.get<GetHttpResponse<ThueCongViecResponse>>(`thue-cong-viec/${id}`),
  updateDetailHireWork : (id:number,cv:FieldValues) => http.put<GetHttpResponse<ThueCongViecResponse>>(`thue-cong-viec/${id}`,cv),
  deleteHireWork : (id:number) => http.delete(`thue-cong-viec/${id}`),
  completedWork : (id:number) => http.post(`thue-cong-viec/hoan-thanh-cong-viec/${id}`),
  getWorkWithPage : (query:string) => http.get<GetHttpResponse<ResponseByPage<GetCongViecResponse>>>(`cong-viec/phan-trang-tim-kiem?${query}`),
  getTypeWorkWithPage : (query:string) => http.get<GetHttpResponse<ResponseByPage<GetTypeWorkResponse>>>(`loai-cong-viec/phan-trang-tim-kiem?${query}`),
  deleteWork : (id:number)=> http.delete(`cong-viec/${id}`),
  updateWork : (id:number,work:FieldValues) => http.put<GetHttpResponse<GetCongViecResponse>>(`cong-viec/${id}`,work),
  addWork : (work:FieldValues) => http.post<GetHttpResponse<GetCongViecResponse>>(`cong-viec`,work),
  postLoaiCongViec : (type:FieldValues) => http.post<GetHttpResponse<GetTypeWorkResponse[]>>("loai-cong-viec",type),
  updateLoaiCongViec : (id: number,type:FieldValues) => http.put<GetHttpResponse<GetTypeWorkResponse>>(`loai-cong-viec/${id}`,type),
  deleteLoaiCongViec : (id: number) => http.delete<GetHttpResponse<GetTypeWorkResponse>>(`loai-cong-viec/${id}`),
  getThueCongViecUser : () => http.get<GetHttpResponse<HireWorkOfUserResponse[]>>(`thue-cong-viec/lay-danh-sach-da-thue`),
};
