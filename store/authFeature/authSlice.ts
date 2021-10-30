import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { loginUser } from "./authFunctions";

export enum ERole {
  ADMIN = "Admin",
  USER = "User",
}

export interface IUser {
  id: string;
  username: string;
  role: ERole;
}

export interface IAuthState {
  user: IUser | null;
  pending: boolean;
  userError: string | null;
}

const initialAuthState: IAuthState = {
  user: null,
  pending: false,
  userError: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState as IAuthState,
  reducers: {
    logout: (state) => {
      return {
        ...state,
        pending: false,
        user: null,
        userError: null,
      };
    },
    resetUserError: (state) => {
      return {
        ...state,
        userError: null,
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.Auth,
        };
      })
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          user: null,
          userError: null,
          pending: true,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          pending: false,
          user: {
            ...action.payload,
          },
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          user: null,
          userError: action.payload || "",
          pending: false,
        };
      });
  },
});
