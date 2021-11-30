import moment from "moment";
import { FunctionComponent } from "react";
import { useAppSelector } from "../../store";
import { IReservation } from "../../store/reservationFeature/reservationSlice";
import ReservationOptions from "./ReservationOptions";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const state = useAppSelector((state) => state);
  return (
    <div className="reservation">
      <div className="col-location">
        <p>Location - {reservation.id.cubicleID}</p>
      </div>
      <div className="col-date">
        <p>{moment(reservation.id.startTime).calendar()}</p>
        <p>-</p>
        <p>{moment(reservation.endTime).calendar()}</p>
      </div>
      {state.Reservation.adminToggled && <p>{reservation.userID}</p>}

      <ReservationOptions reservation={reservation} />
    </div>
  );
};

export default Reservation;
