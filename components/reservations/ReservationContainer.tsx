import { FunctionComponent, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { reservationSlice } from "../../store/reservationFeature/reservationSlice";
import { useAppSelector } from "../../store/store";
import Reservation from "./Reservation";
import ReservationCreation from "./ReservationCreation";
import ReservationFilter from "./ReservationFilter";

const ReservationContainer: FunctionComponent = () => {
  const store = useAppSelector((state) => state);
  const dispatch = useDispatch();

  if (store.Reservation.error) {
    return (
      <div className="container">
        <h1 className="serverError">
          {store.Reservation.error} please refresh
        </h1>
      </div>
    );
  }

  const propagateReservations = (): ReactNode => {
    if (store.Reservation.reservations.length < 1) {
      return (
        <div className="container">
          {store.Reservation.adminToggled ? (
            <div className="noReservationsContainer">
              <p>There are currently no reservations</p>
            </div>
          ) : (
            <div className="noReservationsContainer">
              <p>
                It looks like you currently have no reservations. Would you like
                to create one?
              </p>
              <button
                className="btnCreate"
                onClick={() => {
                  dispatch(reservationSlice.actions.toggleCreation(true));
                }}
              >
                Press Here!
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="reservationContainer">
          {store.Reservation.reservations.map((reservation, index) => (
            <Reservation key={index} reservation={reservation} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="reservationHeader">
        <p>Reservations</p>
        <div className="actionGroup">
          {store.Reservation.adminToggled && (
            <button
              className="filterBtn"
              onClick={() => dispatch(reservationSlice.actions.toggleFilter())}
            >
              Filter
            </button>
          )}
          {!store.Reservation.adminToggled && (
            <button
              className="btnCreate"
              onClick={() =>
                dispatch(reservationSlice.actions.toggleCreation(true))
              }
            >
              Create Reservation
            </button>
          )}
        </div>
        {/* TODO: Refresh Button */}
      </div>
      {propagateReservations()}
      <ReservationFilter />
      <ReservationCreation />
    </div>
  );
};

export default ReservationContainer;
