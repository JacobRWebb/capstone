import { FunctionComponent, useState } from "react";
import { IReservation } from "../../store/reservationFeature/reservationSlice";

const Reservation: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const [viewing, setViewing] = useState<boolean>(false);

  return (
    <div
      className="reservation"
      onClick={() => {
        setViewing(!viewing);
      }}
      aria-expanded={viewing}
    >
      <div className="reservationPrimary">
        <div className="statusPill">Starting in x ...</div>
        <div className="statusPill">
          Location {reservation.location.building}
        </div>
        <div className="statusPill">
          Desk Number {reservation.location.workspace.deskID}
        </div>
        <div className="statusPill">
          Desk Type {reservation.location.workspace.type}
        </div>
      </div>
      <div
        className="reservationSecondary"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
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
