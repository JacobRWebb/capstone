import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_DOMAIN } from "../../util/constants";
import { ERole, IUser } from "./authSlice";

export const loginUser = createAsyncThunk<
  IUser,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  const response = await fetch(`${API_DOMAIN}/auth/login`, {
    body: JSON.stringify({ username: data.username, password: data.password }),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();

  if (result.error) {
    return thunkAPI.rejectWithValue(result.error);
  }

  return {
    id: result.username,
    username: result.username,
    role: result.role === "1" ? ERole.ADMIN : ERole.USER,
  };
});

export const checkToken = createAsyncThunk<
  IUser,
  { token: string },
  { rejectValue: string }
>("auth/checkToken", async (data, thunkAPI) => {
  if (data.token.length <= 1) {
    return thunkAPI.rejectWithValue("Invalid Token");
  }

  const response = await fetch(`${API_DOMAIN}/auth/checkToken`, {
    body: JSON.stringify({ token: data.token }),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();

  if (result.error) {
    return thunkAPI.rejectWithValue(result.error);
  }

  return {
    id: result.username,
    username: result.username,
    role: result.role === "1" ? ERole.ADMIN : ERole.USER,
  };
});
