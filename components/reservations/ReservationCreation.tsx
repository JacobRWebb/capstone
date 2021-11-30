import { FunctionComponent, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { reservationSlice, useAppSelector } from "../../store";
import { Overlay } from "../extensions";
import CompletePhase from "./CreationPhases/CompletePhase";
import FilterPhase from "./CreationPhases/FilterPhase";
import ViewingPhase from "./CreationPhases/ViewingPhase";

const ReservationCreation: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const [currentPhase, setCurrentPhase] = useState<number>(0);

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const lastPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const phases: ReactNode[] = [
    <FilterPhase nextPhase={nextPhase} lastPhase={lastPhase} />,
    <ViewingPhase nextPhase={nextPhase} lastPhase={lastPhase} />,
    <CompletePhase />,
  ];

  return (
    <Overlay
      open={state.Reservation.creatingToggled}
      onClick={() => {
        setCurrentPhase(0);
        dispatch(reservationSlice.actions.resetCurrentCreation());
        dispatch(reservationSlice.actions.toggleCreation(false));
      }}
    >
      <div className="reservationCreationContainer">
        <div className="reservationCreationHeader">
          <h1>Reservtion</h1>
        </div>
        {phases[currentPhase]}
      </div>
    </Overlay>
  );
};

export default ReservationCreation;
