import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchReservations,
  reservationSlice,
  useAppSelector,
} from "../../../store";
import { API_DOMAIN } from "../../../util/constants";

export interface IIncomingCubicle {
  cubicleID: string;
  floor: string;
  building: string;
}

const ViewingPhase: FunctionComponent<{
  nextPhase: () => void;
  lastPhase: () => void;
}> = ({ nextPhase, lastPhase }) => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cubicles, setCubicles] = useState<IIncomingCubicle[]>([]);
  const [currentCubicleSelection, setCurrentCubicleSelection] =
    useState<string>();

  useEffect(() => {
    if (
      state.Reservation.currentCreation.startTime &&
      state.Reservation.currentCreation.endTime
    ) {
      const cookies = document.cookie.split(";");
      let token =
        cookies.find((c) => c.startsWith("token="))?.split("=")[1] || "";
      const startTime = moment(state.Reservation.currentCreation.startTime);
      const endTime = moment(state.Reservation.currentCreation.endTime);
      fetch(`${API_DOMAIN}/reservation/available`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          filter: {
            startTime: startTime,
            endTime: endTime,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.cubicles) {
            setCubicles(data.cubicles);
            setIsLoading(false);
          }
        });
    }
  }, [state]);

  const reserve = () => {
    const cookies = document.cookie.split(";");
    let token =
      cookies.find((c) => c.startsWith("token="))?.split("=")[1] || "";

    const startTime = moment(state.Reservation.currentCreation.startTime);
    const endTime = moment(state.Reservation.currentCreation.endTime);

    fetch(`${API_DOMAIN}/reservation/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        filter: {
          cubicleID: currentCubicleSelection,
          startTime: startTime,
          endTime:
            startTime.diff(endTime) < 1 ? endTime.add(1, "days") : endTime,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          fetchReservations({
            token,
            adminView: state.Reservation.adminToggled,
            filter: state.Reservation.filter,
          })
        );
        nextPhase();
      });
  };

  return (
    <div className="reservationCreationResult">
      <button
        onClick={() => {
          dispatch(reservationSlice.actions.resetCurrentCreation());
          lastPhase();
        }}
      >
        Last Page
      </button>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <select
          onChange={(event) => {
            setCurrentCubicleSelection(event.target.value);
          }}
          className="cubicleSelectorDropdown"
        >
          <option disabled value="" selected>
            Select a cubicle
          </option>
          {cubicles.map((cubicle) => (
            <option value={cubicle.cubicleID} key={cubicle.cubicleID}>
              {cubicle.cubicleID}
            </option>
          ))}
        </select>
      )}
      {currentCubicleSelection && (
        <button
          className="creationReserveBtn"
          onClick={() => {
            reserve();
          }}
        >
          Reserve
        </button>
      )}
    </div>
  );
};

export default ViewingPhase;
