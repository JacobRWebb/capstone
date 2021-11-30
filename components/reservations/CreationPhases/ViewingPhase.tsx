import { FunctionComponent } from "react";

const ViewingPhase: FunctionComponent<{
  nextPhase: () => void;
  lastPhase: () => void;
}> = ({ nextPhase, lastPhase }) => {
  return (
    <div className="reservationCreationResult">
      Viewing Phase
      <button
        onClick={() => {
          lastPhase();
        }}
      >
        last
      </button>
    </div>
  );
};

export default ViewingPhase;
