import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import moment from "moment";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchReservations,
  reservationSlice,
  useAppSelector,
} from "../../store";
import { API_DOMAIN } from "../../util/constants";
import { Overlay } from "../extensions";

const ReservationFilter: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const [usernames, setUsernames] = useState<string[]>([]);
  const [cubicles, setCubicles] = useState<string[]>([]);

  useEffect(() => {
    if (state.Reservation.filterToggled) {
      fetch(`${API_DOMAIN}/reservation/findFilter`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.usernames) {
            setUsernames(res.usernames);
            setCubicles(res.cubiclenames);
          }
        });
    }
  }, [state.Reservation.filterToggled]);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const [startInstance, setStartInstance] = useState<Instance>();
  const [endInstance, setEndInstance] = useState<Instance>();

  const [token, setToken] = useState<string>();

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let token =
      cookies.find((c) => c.startsWith("token="))?.split("=")[1] || "";
    setToken(token);

    if (startRef.current && !startInstance) {
      let tempInstance: Instance = flatpickr(startRef.current, {
        onChange: (date) => {
          if (!date[0]) {
            return;
          }
          dispatch(
            reservationSlice.actions.applyFilter({
              startTime: date[0].toString(),
            })
          );

          if (state.Reservation.filter.endTime) {
            if (date[0] > moment(state.Reservation.filter.endTime).toDate()) {
              dispatch(reservationSlice.actions.applyFilter({ endTime: null }));
            }
          }
        },
      });
      setStartInstance(tempInstance);
    }
    if (endRef.current && !endInstance) {
      let tempInstance: Instance = flatpickr(endRef.current, {
        onChange: (date) => {
          if (!date[0]) {
            return;
          }
          dispatch(
            reservationSlice.actions.applyFilter({
              endTime: date[0].toString(),
            })
          );
        },
      });
      setEndInstance(tempInstance);
    }
  }, []);

  useEffect(() => {
    if (endRef.current && startInstance) {
      if (endInstance) {
        endInstance.destroy();
      }
      let tempInstance = flatpickr(endRef.current, {
        defaultDate: state.Reservation.filter.endTime
          ? startInstance.selectedDates[0] >
            moment(state.Reservation.filter.endTime).toDate()
            ? startInstance.selectedDates[0]
            : state.Reservation.filter.endTime
          : undefined,
        minDate: startInstance?.selectedDates[0],
        onChange: (date) => {
          if (!date[0]) {
            return;
          }
          dispatch(
            reservationSlice.actions.applyFilter({
              endTime: date[0].toString(),
            })
          );
        },
      });
      setEndInstance(tempInstance);
    }
  }, [state.Reservation.filter.startTime, state.Reservation.filter.endTime]);

  const resetFilter = () => {
    dispatch(reservationSlice.actions.resetFilter());

    if (startInstance) {
      startInstance.clear();
    }

    if (endInstance) {
      endInstance.clear();
    }
  };

  const searchFilter = () => {
    dispatch(
      fetchReservations({
        token: token || "",
        adminView: state.Reservation.adminToggled,
        filter: { ...state.Reservation.filter },
      })
    );
  };

  return (
    <Overlay
      open={state.Reservation.filterToggled}
      onClick={() => {
        dispatch(reservationSlice.actions.toggleFilter());
      }}
    >
      <div className="filter">
        <div className="filterInput">
          <select
            value={state.Reservation.filter.userID || ""}
            onChange={(event) => {
              dispatch(
                reservationSlice.actions.applyFilter({
                  userID:
                    event.currentTarget.value.length > 0
                      ? event.currentTarget.value
                      : undefined,
                })
              );
            }}
            className="inputField"
          >
            <option value="" selected>
              Select a user
            </option>
            {usernames.map((username) => (
              <option value={username} key={username}>
                {username}
              </option>
            ))}
          </select>
          <select
            value={state.Reservation.filter.cubicleID || ""}
            onChange={(event) => {
              dispatch(
                reservationSlice.actions.applyFilter({
                  cubicleID:
                    event.currentTarget.value.length > 0
                      ? event.currentTarget.value
                      : undefined,
                })
              );
            }}
            className="inputField"
          >
            <option value="" selected>
              Select a cubicle
            </option>
            {cubicles.map((cubicle) => (
              <option value={cubicle} key={cubicle}>
                {cubicle}
              </option>
            ))}
          </select>

          <input
            className="inputField"
            ref={startRef}
            placeholder="Start Date"
          />
          <input className="inputField" ref={endRef} placeholder="End Date" />

          <div className="filterButtonGroup">
            <button className="filterResetButton" onClick={() => resetFilter()}>
              Reset Filter
            </button>
            <button
              className="filterSearchButton"
              onClick={() => {
                searchFilter();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ReservationFilter;
