import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";

const OverlayContent: FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...divProps }) => {
  return (
    <div {...divProps} onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
};

export default OverlayContent;
