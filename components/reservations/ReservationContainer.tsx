import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { reservationSlice } from "../../store/reservationFeature/reservationSlice";
import { useAppSelector } from "../../store/store";
import Reservation from "./Reservation";

const ReservationContainer: FunctionComponent = () => {
  const store = useAppSelector((state) => state);
  const dispatch = useDispatch();

  if (store.Reservation.error) {
    return (
      <div className="container reservationContainer">
        <h1>There was a problem. The page will automatically refresh.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="reservationHeader">
        <p>Your Reservation List</p>
        <button>Filter</button>
      </div>
      {store.Reservation.reservations.length > 1 ? (
        <div className="noReservationsContainer">
          <p>
            It looks like you have no reservations would you like to make one?
          </p>
          <button
            className="createReservationButton"
            onClick={() => {
              dispatch(reservationSlice.actions.createReservation(true));
            }}
          >
            Press Here
          </button>
        </div>
      ) : (
        <div className="reservationContainer">
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
        </div>
      )}
    </div>
  );
};

export default ReservationContainer;
