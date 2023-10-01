import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAuthService } from "../../services/quanLyAuth.service";
import { FieldValues } from "react-hook-form";
import { QueryDividePage } from "../../react-app-env";

export const dangNhap = createAsyncThunk(
  "quanLyAuth/dangNhap",
  async (payload: FieldValues, { rejectWithValue }) => {
    try {
      const res = await quanLyAuthService.dangNhap(payload);
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "quanLyAuth/updateUser",
  async (payload: FieldValues, { rejectWithValue }) => {
    try {
      const res = await quanLyAuthService.updateUser(payload.id, payload);
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const getUserInfor = createAsyncThunk(
  "quanLyAuth/getUserInfor",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quanLyAuthService.getUserInfor(id);
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
)

export const getListUser = createAsyncThunk(
  "quanLyCongViec/getListUser",
  async (payload: QueryDividePage, { rejectWithValue }) => {
    try {
      const { pageIndex,pageSize, keyword } = payload
      let query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
      if(keyword){
        query = `pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      }
      const res = await quanLyAuthService.getUserWithPage(query)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
);

export const layDanhSachUser = createAsyncThunk(
  "quanLyAuth/layDanhSachUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await quanLyAuthService.layDanhSachUser();
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "quanLyAuth/uploadAvatar",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const res = await quanLyAuthService.uploadAvatar(payload);
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
