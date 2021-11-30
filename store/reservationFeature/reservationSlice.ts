import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchReservations } from "./reservationFunctions";

export interface IFilter {
  cubicleID: string | null;
  userID: string | null;
  startTime: string | null;
  endTime: string | null;
}

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
  pending: boolean;
  filterToggled: boolean;
  creatingToggled: boolean;
  adminToggled: boolean;
  error: string | null;
  reservations: IReservation[];
  filter: IFilter;
  currentCreation: ICurrentCreation;
}

export interface ICurrentCreation {
  startTime: string | null;
  endTime: string | null;
  cubicleID: string | null;
}

const defaultFilter: IFilter = {
  cubicleID: null,
  userID: null,
  startTime: null,
  endTime: null,
};

const initialReservationState: IReservationState = {
  pending: false,
  filterToggled: false,
  creatingToggled: false,
  adminToggled: false,
  error: null,
  reservations: [],
  filter: defaultFilter,
  currentCreation: {
    startTime: null,
    endTime: null,
    cubicleID: null,
  },
};

export const reservationSlice = createSlice({
  name: "Reservation",
  initialState: initialReservationState as IReservationState,
  reducers: {
    toggleAdmin: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        adminToggled: action.payload,
      };
    },
    toggleCreation: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        creatingToggled: action.payload,
      };
    },
    toggleFilter: (state) => {
      return {
        ...state,
        filterToggled: !state.filterToggled,
      };
    },
    applyFilter: (state, action: PayloadAction<Partial<IFilter>>) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },
    resetFilter: (state) => {
      return { ...state, filter: defaultFilter };
    },
    applyCurrentCreation: (
      state,
      action: PayloadAction<Partial<ICurrentCreation>>
    ) => {
      return {
        ...state,
        currentCreation: { ...state.currentCreation, ...action.payload },
      };
    },
    resetCurrentCreation: (state) => {
      return {
        ...state,
        currentCreation: {
          startTime: null,
          endTime: null,
          cubicleID: null,
        },
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
