import { FunctionComponent, useState } from "react";

const Reservation: FunctionComponent = () => {
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
        <div className="statusPill">Status</div>
        <div className="statusPill">Status</div>
      </div>
      <div
        className="reservationSecondary"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="container reservationContent">
          <p>Testing random words</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
