import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReservation } from "./reservationSlice";

export const placeholder_emptyout = () => {};

export const fetchReservations = createAsyncThunk<
  IReservation[],
  {},
  { rejectValue: string }
>("reservations/fetch", async (_data, thunkAPI) => {
  //  TODO Fetch Reservations
  return [];

  return thunkAPI.rejectWithValue("Failed to fetch reservations");
});
