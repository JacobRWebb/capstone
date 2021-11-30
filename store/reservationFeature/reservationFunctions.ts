import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFilter } from ".";
import { API_DOMAIN } from "../../util/constants";
import { IReservation } from "./reservationSlice";

interface ISend {
  token: String;
  filter: IFilter;
}

export const fetchReservations = createAsyncThunk<
  IReservation[],
  { token: string; adminView: boolean; filter: IFilter },
  { rejectValue: string }
>("reservations/fetch", async (data, thunkAPI) => {
  // TODO - Pass proper filter back to server
  const response = await fetch(
    `${API_DOMAIN}/reservation/${data.adminView ? "all" : ""}`,
    {
      body: JSON.stringify({
        token: data.token,
        filter: data.filter,
      } as ISend),
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const reservations = await response.json();
    if (reservations["error"]) {
      return thunkAPI.rejectWithValue(reservations["error"]);
    }

    if (reservations["reservations"]) {
      return reservations["reservations"];
    }

    return thunkAPI.rejectWithValue("Data Failure");
  }

  return thunkAPI.rejectWithValue("Server Failure");
});
