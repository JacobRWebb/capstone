import { FunctionComponent, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fetchReservations, IReservation, useAppSelector } from "../../store";
import { API_DOMAIN } from "../../util/constants";
import { useOnClickOutside } from "../../util/hooks";
import Dropdown from "../extensions/Dropdown";

const ReservationOptions: FunctionComponent<{ reservation: IReservation }> = ({
  reservation,
}) => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [toggled, setToggle] = useState<boolean>(false);
  useOnClickOutside(ref, () => setToggle(false));

  const deletePost = async () => {
    const cookies = document.cookie.split(";");
    let token =
      cookies.find((c) => c.startsWith("token="))?.split("=")[1] || "";

    const request = await fetch(`${API_DOMAIN}/reservation/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        filter: {
          reservationID: {
            startTime: reservation.id.startTime,
            cubicleID: reservation.id.cubicleID,
          },
        },
      }),
    });

    if (request.ok) {
      dispatch(
        fetchReservations({
          token,
          adminView: state.Reservation.adminToggled,
          filter: state.Reservation.filter,
        })
      );
    }
  };

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
        <button className="cancel dropdownItem" onClick={() => deletePost()}>
          Cancel
        </button>
      </Dropdown>
    </div>
  );
};

export default ReservationOptions;
