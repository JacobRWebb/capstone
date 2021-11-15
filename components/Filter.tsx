import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { reservationSlice } from "../store/reservationFeature/reservationSlice";
import { useAppSelector } from "../store/store";

const Filter: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      className="filterContainer"
      aria-expanded={state.Reservation.filterOpen}
      onClick={() => {
        dispatch(reservationSlice.actions.toggleFilter({}));
      }}
    >
      <div className="filter" onClick={(event) => event.stopPropagation()}>
        Filter
      </div>
    </div>
  );
};

export default Filter;
