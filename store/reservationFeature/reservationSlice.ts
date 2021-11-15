import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchReservations } from "./reservationFunctions";

export interface IReservation {
  id: {
    startTime: string;
    cubicleID: string;
  };
  userID: string;
  timeStamp: string;
  endTime: string;
}

export interface IReservationState {
  reservations: IReservation[];
  pending: boolean;
  creatingReservation: boolean;
  filterOpen: boolean;
  error: string | null;
}

const initialReservationState: IReservationState = {
  reservations: [],
  pending: false,
  creatingReservation: false,
  filterOpen: false,
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
    toggleFilter: (state, _action) => {
      return {
        ...state,
        filterOpen: !state.filterOpen,
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
