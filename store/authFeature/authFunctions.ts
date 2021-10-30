import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_DOMAIN, isProd } from "../../util/constants";
import { ERole, IUser } from "./authSlice";

export const loginUser = createAsyncThunk<
  IUser,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  //  TODO --> Fetch from API

  const response = await fetch(`${API_DOMAIN}/login`, {
    body: JSON.stringify({ username: data.username, password: data.password }),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);
  let x = await response.json();
  console.log(x);

  if (data.username !== "") {
    // //  TODO remove false token
    if (!isProd) {
      document.cookie = "token=token;max-age=60*60*24;secure=true";
    }

    return {
      id: "wxy-123as",
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
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  //  TODO --> Fetch from API
  if (data.token && data.token.length > 0) {
    return {
      id: "wxy-123as",
      username: "Xodius",
      password: "qweqweqw",
      role: ERole.ADMIN,
    };
  }

  return thunkAPI.rejectWithValue("Token Invalidated");
});
