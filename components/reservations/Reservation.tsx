import { FunctionComponent, useState } from "react";
import {
  ESTATUS,
  IReservation,
} from "../../store/reservationFeature/reservationSlice";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const [viewing, setViewing] = useState<boolean>(false);

  const status = () => {
    switch (reservation.status) {
      case ESTATUS.Warning:
        return "yellow";
      case ESTATUS.BAD:
        return "red";
      default:
        return "";
    }
  };

  return (
    <div
      className="reservation"
      onMouseEnter={() => setViewing(true)}
      onMouseLeave={() => setViewing(false)}
      aria-expanded={viewing}
    >
      <div className="reservationPrimary">
        <span className={`blob ${status()}`}></span>
        <div className="col-date">
          <div className="reservationQuickInfo">
            <p>{reservation.time}</p>
          </div>
        </div>
        <div className="col-location">
          <div className="reservationQuickInfo">
            <p>Location {reservation.location.building}</p>
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
