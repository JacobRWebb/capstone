import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERole } from "../authFeature/authSlice";
import { IReservation, WORKSPACE_TYPE } from "./reservationSlice";

export const placeholder_emptyout = () => {};

export const fetchReservations = createAsyncThunk<
  IReservation[],
  {},
  { rejectValue: string }
>("reservations/fetch", async (_data, thunkAPI) => {
  //  TODO Fetch Reservations
  const reservations: IReservation[] = [];

  reservations.push({
    owner: { id: "123", username: "123", role: ERole.USER },
    location: {
      building: "Welcher",
      workspace: { type: WORKSPACE_TYPE.HOTEL_Cubicle, deskID: "WZX_111" },
    },
  });

  reservations.push({
    owner: { id: "123", username: "123", role: ERole.USER },
    location: {
      building: "Welcher",
      workspace: { type: WORKSPACE_TYPE.HOTEL_Cubicle, deskID: "WZX_111" },
    },
  });

  reservations.push({
    owner: { id: "123", username: "123", role: ERole.USER },
    location: {
      building: "Welcher",
      workspace: { type: WORKSPACE_TYPE.HOTEL_Cubicle, deskID: "WZX_111" },
    },
  });

  reservations.push({
    owner: { id: "123", username: "123", role: ERole.USER },
    location: {
      building: "Welcher",
      workspace: { type: WORKSPACE_TYPE.HOTEL_Cubicle, deskID: "WZX_111" },
    },
  });

  reservations.push({
    owner: { id: "123", username: "123", role: ERole.USER },
    location: {
      building: "Welcher",
      workspace: { type: WORKSPACE_TYPE.HOTEL_Cubicle, deskID: "WZX_111" },
    },
  });

  reservations.push({
    owner: { id: "321", username: "321", role: ERole.ADMIN },
    location: {
      building: "Boydl",
      workspace: { type: WORKSPACE_TYPE.COMMUNAL_DESK, deskID: "445" },
    },
  });

  reservations.push({
    owner: { id: "321", username: "321", role: ERole.ADMIN },
    location: {
      building: "Boydl",
      workspace: { type: WORKSPACE_TYPE.COMMUNAL_DESK, deskID: "445" },
    },
  });

  reservations.push({
    owner: { id: "321", username: "321", role: ERole.ADMIN },
    location: {
      building: "Boydl",
      workspace: { type: WORKSPACE_TYPE.COMMUNAL_DESK, deskID: "445" },
    },
  });

  reservations.push({
    owner: { id: "321", username: "321", role: ERole.ADMIN },
    location: {
      building: "Boydl",
      workspace: { type: WORKSPACE_TYPE.COMMUNAL_DESK, deskID: "445" },
    },
  });

  reservations.push({
    owner: { id: "321", username: "321", role: ERole.ADMIN },
    location: {
      building: "Boydl",
      workspace: { type: WORKSPACE_TYPE.COMMUNAL_DESK, deskID: "445" },
    },
  });

  return reservations;

  return thunkAPI.rejectWithValue("Failed to fetch reservations");
});

// export interface IReservation {
//   owner: IUser;
//   location: {
//     building: string;
//     workspace: {
//       type: WORKSPACE_TYPE;
//       deskID: string;
//     };
//   };
// }
