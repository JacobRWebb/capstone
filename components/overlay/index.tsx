import { FunctionComponent } from "react";

const Overlay: FunctionComponent<{ activated: boolean; onClick: () => void }> =
  ({ activated, onClick, children }) => {
    return (
      <div
        className={`overlay ${activated ? "overlay-active" : ""}`}
        onClick={() => onClick()}
      >
        {children}
      </div>
    );
  };

export default Overlay;
