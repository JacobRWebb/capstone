import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERole, IUser } from "./authSlice";

export const loginUser = createAsyncThunk<
  IUser,
  { username: string; password: string },
  { rejectValue: string; fulfillValue: string }
>("auth/login", async (data, thunkAPI) => {
  //  TODO --> Fetch from API
  if (data.username !== "") {
    return {
      username: data.username,
      password: data.password,
      role: ERole.ADMIN,
    };
  }
  return thunkAPI.rejectWithValue("Failed to fetch user");
});

export const checkToken = createAsyncThunk<
  IUser,
  { token: string },
  { rejectValue: string; fulfill: string }
>("auth/login", async (data, thunkAPI) => {
  //  TODO --> Fetch from API
  if (data.token && data.token.length > 0) {
    return {
      username: "Xodius",
      password: "qweqweqw",
      role: ERole.ADMIN,
    };
  }

  return thunkAPI.rejectWithValue("Token Invalidated");
});
