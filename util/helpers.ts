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

export const useOnClickOutside = (
  ref: RefObject<any>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
