import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { quanLyCongViecReducer } from "./quanLyCongViec/slice";
import { quanLyAuthActions, quanLyAuthReducer } from "./quanLyAuth/slice";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan/slice";

export const store = configureStore({
  reducer: {
    quanLyCongViec: quanLyCongViecReducer,
    quanLyAuth: quanLyAuthReducer,
    quanLyBinhLuan: quanLyBinhLuanReducer,
  },
});

store.dispatch(quanLyAuthActions.layAuth());

export type RootState = ReturnType<(typeof store)["getState"]>;
export type AppDispatch = (typeof store)["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
