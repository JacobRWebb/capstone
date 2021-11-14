import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_DOMAIN } from "../../util/constants";
import { IReservation } from "./reservationSlice";

export const placeholder_emptyout = () => {};

interface ISend {
  token: String;
  filter: IFilter;
}

interface IFilter {
  cubicalID: string | null;
  userID: string | null;
}

export const fetchReservations = createAsyncThunk<
  IReservation[],
  { token: string },
  { rejectValue: string }
>("reservations/fetch", async (data, thunkAPI) => {
  const response = await fetch(`${API_DOMAIN}/reservation/`, {
    body: JSON.stringify({
      token: data.token,
      filter: { userID: "Test", cubicalID: "qweqwe" },
    } as ISend),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const reservations = await response.json();
    console.log(reservations);
  }
  return thunkAPI.rejectWithValue("Failed to fetch reservations");
});
