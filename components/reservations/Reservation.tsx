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
      onClick={() => {
        setViewing(!viewing);
      }}
      aria-expanded={viewing}
    >
      <div className="reservationPrimary">
        <span
          style={{ display: !viewing ? "flex" : "none" }}
          className={`blob ${status()}`}
        ></span>
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
      </div>
      <div
        className="reservationSecondary"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {reservation.status === ESTATUS.BAD ? (
          <div className="container reservationContent">
            <p>
              <span className={`blob ${status()}`} /> Urgent Attention Required
              Press here .... to fix issue
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="container reservationContent">
          <p>
            This is an area for extended information. Perhaps you can add people
            to your reservation here.
          </p>
          <p>
            Another Idea for this location is place a calander here showing when
            the date is compared to the current day. Like a head up display
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
