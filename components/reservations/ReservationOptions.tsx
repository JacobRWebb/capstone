import { FunctionComponent, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useOnClickOutside } from "../../util/hooks";
import Dropdown from "../extensions/Dropdown";

const ReservationOptions: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [toggled, setToggle] = useState<boolean>(false);
  useOnClickOutside(ref, () => setToggle(false));

  return (
    <div className="reservationOptions" ref={ref}>
      <Dropdown
        icon={
          <BiDotsHorizontalRounded
            size="28px"
            onClick={() => setToggle(!toggled)}
          />
        }
        toggled={toggled}
      >
        <button className="dropdownItem">Edit</button>
        <button className="cancel dropdownItem">Cancel</button>
      </Dropdown>
    </div>
  );
};

export default ReservationOptions;
