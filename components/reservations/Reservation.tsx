import moment from "moment";
import { FunctionComponent } from "react";
import { IReservation } from "../../store/reservationFeature/reservationSlice";
import ReservationOptions from "./ReservationOptions";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
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
      <ReservationOptions />
    </div>
  );
};

export default Reservation;
