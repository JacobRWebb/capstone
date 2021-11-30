import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import moment from "moment";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const FilterPhase: FunctionComponent<{
  nextPhase: () => void;
  lastPhase: () => void;
}> = ({ nextPhase, lastPhase }) => {
  const maxStartDate: Date = moment().add(3, "months").toDate();
  const maxEndDate: Date = moment().add(6, "months").toDate();

  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);

  const [endCalendarInstance, setEndCalendarInstance] = useState<Instance>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (startCalendarRef.current) {
      flatpickr(startCalendarRef.current, {
        minDate: new Date(),
        maxDate: maxStartDate,
        onChange: (date) => {
          setStartDate(date[0]);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (startDate && endCalendarRef.current) {
      if (endCalendarInstance) {
        endCalendarInstance.destroy();
      }
      if (endDate) {
        if (startDate > endDate) {
          setEndDate(startDate);
        }
      }
      let tempInstance = flatpickr(endCalendarRef.current, {
        defaultDate: endDate
          ? startDate > endDate
            ? startDate
            : endDate
          : undefined,
        minDate: startDate,
        maxDate: maxEndDate,
        onChange: (date) => {
          setEndDate(date[0]);
        },
      });
      setEndCalendarInstance(tempInstance);
    }
  }, [startDate, endDate]);

  return (
    <div className="reservationCreationSelectorGroup">
      <input
        className="Testing"
        placeholder="Start Date"
        type="date"
        ref={startCalendarRef}
      />
      <input
        disabled={!startDate}
        placeholder="End Date"
        ref={endCalendarRef}
      />
      <button
        onClick={() => {
          nextPhase();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default FilterPhase;
