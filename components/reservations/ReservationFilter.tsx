import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import {
  fetchReservations,
  reservationSlice,
  useAppSelector,
} from "../../store";
import { Overlay } from "../extensions";

const ReservationFilter: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Overlay
      open={state.Reservation.filterToggled}
      onClick={() => {
        dispatch(reservationSlice.actions.toggleFilter());
      }}
    >
      <div className="filter">
        <input
          placeholder="User ID"
          onChange={(event) => {
            dispatch(
              reservationSlice.actions.applyFilter({
                userID:
                  event.currentTarget.value.length > 0
                    ? event.currentTarget.value
                    : undefined,
              })
            );
          }}
        />
        <button
          onClick={() => {
            const cookies = document.cookie.split(";");
            let token =
              cookies.find((c) => c.startsWith("token="))?.split("=")[1] || "";

            dispatch(
              fetchReservations({
                token,
                adminView: state.Reservation.adminToggled,
                filter: { ...state.Reservation.filter },
              })
            );
          }}
        >
          Search
        </button>
      </div>
    </Overlay>
  );
};

export default ReservationFilter;
