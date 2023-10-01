import { createSlice } from "@reduxjs/toolkit";
import {
  dangNhap,
  getListUser,
  getUserInfor,
  updateUser,
  uploadAvatar,
  layDanhSachUser,
} from "./thunkAction";
import { GetAuthResponse, GetTokenResponse } from "../../react-app-env";

type InitialState = {
  auth?: GetTokenResponse<GetAuthResponse>;
  user?: GetAuthResponse;
  listUser?: GetAuthResponse[];
  totalRow?: number;
  userList?: GetAuthResponse[];
};

const initialState: InitialState = {
  auth: undefined,
  listUser: [],
  totalRow: undefined,
  user: undefined,
  userList: [],
};

export const { reducer: quanLyAuthReducer, actions: quanLyAuthActions } =
  createSlice({
    name: "quanLyAuth",
    initialState,
    reducers: {
      dangXuat: (state) => {
        localStorage.removeItem("user");
        state.auth = undefined;
      },
      layAuth: (state) => {
        const data = localStorage.getItem("user");
        if (data) {
          state.auth = JSON.parse(data);
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(dangNhap.fulfilled, (state, action) => {
          if (action.payload) {
            state.auth = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
          } else {
            alert("Invalid username or password");
          }
        })
        .addCase(getUserInfor.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(layDanhSachUser.fulfilled, (state, action) => {
          state.userList = action.payload;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          if (state.auth?.user && action.payload) {
            state.auth.user = action.payload;
            state.auth.user.password = "";
            localStorage.setItem("user", JSON.stringify(state.auth));
          }
        })
        .addCase(getListUser.fulfilled, (state, action) => {
          if (action.payload) {
            state.listUser = action.payload.data;
            state.totalRow = action.payload.totalRow;
          }
        })
        .addCase(uploadAvatar.fulfilled, (state, action) => {
          if (state.auth?.user && action.payload) {
            state.auth.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.auth));
          }
        });
    },
  });
