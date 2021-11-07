import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from "../authFeature/authSlice";
import { fetchReservations } from "./reservationFunctions";

export enum WORKSPACE_TYPE {
  HOTEL_Cubicle = "Hotel Cubicle",
  COMMUNAL_DESK = "Communal Desk",
}

export enum ESTATUS {
  GOOD = "Good",
  Warning = "Warning",
  BAD = "Bad",
}

export interface IReservation {
  owner: IUser;
  time: String;
  status: ESTATUS;
  location: {
    building: string;
    workspace: {
      type: WORKSPACE_TYPE;
      deskID: string;
    };
  };
}

export interface IReservationState {
  reservations: IReservation[];
  pending: boolean;
  creatingReservation: boolean;
  error: string | null;
}

const initialReservationState: IReservationState = {
  reservations: [],
  pending: false,
  creatingReservation: false,
  error: null,
};

export const reservationSlice = createSlice({
  name: "Reservation",
  initialState: initialReservationState as IReservationState,
  reducers: {
    createReservation: (state, action) => {
      return {
        ...state,
        creatingReservation: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.Reservation,
        };
      })
      .addCase(fetchReservations.pending, (state) => {
        return {
          ...state,
          pending: true,
        };
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        return {
          ...state,
          pending: false,
          error: null,
          reservations: action.payload,
        };
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        return {
          ...state,
          reservations: [],
          pending: false,
          error: action.payload || "",
        };
      });
  },
});
