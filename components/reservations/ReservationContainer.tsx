import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";

const ReservationContainer: FunctionComponent = () => {
  const store = useAppSelector((state) => state);

  if (store.Reservation.error) {
    return (
      <div className="container reservationContainer">
        <h1>There was a problem. The page will automatically refresh.</h1>
      </div>
    );
  }

  return <div className="container reservationContainer">t</div>;
};

export default ReservationContainer;
