import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { reservationSlice, useAppSelector } from "../../store";
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
      <div className="filter">Filter</div>
    </Overlay>
  );
};

export default ReservationFilter;
