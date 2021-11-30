import { RefObject, useEffect } from "react";
import { checkToken } from "../store/authFeature/authFunctions";
import { IUser } from "../store/authFeature/authSlice";
import { AppStore } from "../store/store";

export const preFlightUser = async (
  token: string,
  store: AppStore
): Promise<IUser | null> => {
  await store.dispatch(checkToken({ token }));
  return store.getState().Auth.user;
};
