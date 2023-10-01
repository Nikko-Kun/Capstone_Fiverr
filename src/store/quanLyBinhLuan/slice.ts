import { createSlice } from "@reduxjs/toolkit";
import { BinhLuanResponse } from "../../react-app-env";
import { layBinhLuanTheoCongViec } from "./thunkAction";

type InitialState = {
  binhLuanTheoCongViec?: BinhLuanResponse[];
};

const initialState: InitialState = {
  binhLuanTheoCongViec: [],
};

export const {
  reducer: quanLyBinhLuanReducer,
  actions: quanLyBinhLuanActions,
} = createSlice({
  name: "quanLyBinhLuan",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(layBinhLuanTheoCongViec.fulfilled, (state, action) => {
      state.binhLuanTheoCongViec = action.payload;
    });
  },
});
