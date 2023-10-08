import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyBinhLuanService } from "../../services/quanLyBinhLuan.service";

export const layBinhLuanTheoCongViec = createAsyncThunk(
  "quanLyBinhLuan/layBinhLuanTheoCongViec",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quanLyBinhLuanService.layBinhLuanTheoCongViec(id);
      return res.data.content;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
