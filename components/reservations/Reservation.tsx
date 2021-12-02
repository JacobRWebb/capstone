import moment from "moment";
import { FunctionComponent, ReactNode } from "react";
import { useAppSelector } from "../../store";
import { IReservation } from "../../store/reservationFeature/reservationSlice";
import ReservationOptions from "./ReservationOptions";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const state = useAppSelector((state) => state);

  const StartDateComponent = (): ReactNode => {
    const startTime = moment(reservation.id.startTime);
    const now = moment();
    if (startTime.isAfter(now)) {
      return <p>Starts {startTime.fromNow()}</p>;
    } else {
      return <p>Started {startTime.fromNow()}</p>;
    }
  };

  const EndDateComponent = (): ReactNode => {
    const endTime = moment(reservation.endTime);
    const now = moment();
    if (endTime.isAfter(now)) {
      return <p>Ends {endTime.fromNow()}</p>;
    } else {
      return <p>Ended {endTime.fromNow()}</p>;
    }
  };

  return (
    <div className="reservation">
      <div className="col-location">
        <p>Location - {reservation.id.cubicleID}</p>
      </div>
      <div className="col-date">
        {StartDateComponent()}
        <p>-</p>
        {EndDateComponent()}
      </div>
      {state.Reservation.adminToggled && <p>{reservation.userID}</p>}

      <ReservationOptions reservation={reservation} />
    </div>
  );
};

export default Reservation;
