import { FunctionComponent, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useOnClickOutside } from "../../util/helpers";
const ReservationOptions: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState<boolean>(false);
  useOnClickOutside(ref, () => setDropdown(false));

  return (
    <div className="reservationOptions" ref={ref}>
      <div className="dropdown">
        <BiDotsHorizontalRounded
          size="28px"
          onClick={() => setDropdown(!dropdown)}
        />
        <div
          className="dropdownMenu"
          aria-expanded={dropdown}
          onClick={(event) => event.stopPropagation()}
        >
          <button className="dropdownItem">Edit</button>
          <button className="cancel dropdownItem">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationOptions;
