import { FunctionComponent, MouseEventHandler } from "react";

const Overlay: FunctionComponent<{
  open: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}> = ({ open, onClick, children }) => {
  return (
    <div
      onClick={(event) => {
        onClick(event);
      }}
      className="overlay"
      aria-expanded={open}
    >
      <div
        className="overlayContent"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
