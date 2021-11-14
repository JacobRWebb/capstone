import moment from "moment";
import { FunctionComponent, useState } from "react";
import { IReservation } from "../../store/reservationFeature/reservationSlice";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const [viewing, setViewing] = useState<boolean>(false);

  return (
    <div
      className="reservation"
      onMouseEnter={() => setViewing(true)}
      onMouseLeave={() => setViewing(false)}
      aria-expanded={viewing}
    >
      <div className="reservationPrimary">
        <div className="col-date">
          <div className="reservationQuickInfo">
            <p>{moment(reservation.timeStamp).calendar()}</p>
            <p>{moment(reservation.endTime).calendar()}</p>
          </div>
        </div>
        <div className="col-location">
          <div className="reservationQuickInfo">
            <p>Location - Not Added</p>
          </div>
        </div>
        <div className="btnGroup">
          <button className="btnEdit" aria-expanded={viewing}>
            Edit
          </button>
          <button className="btnDelete" aria-expanded={viewing}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
