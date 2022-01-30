import React from "react";
import { UtilsDate } from "../../../utils";
import { Icons } from "../../";

/**
 * Custom hooks to handle the days of the week seleted by the user
 * for an experience
 */
export const useDaysOfWeeks = () => {
  const [enableDays, handleEnableDays] = React.useState(
    Array.from({ length: 7 }, (_, i) => false)
  );
  const activeDays = (i) => {
    let newArray = [...enableDays];
    newArray[i] = !newArray[i];
    handleEnableDays(newArray);
  };
  return [enableDays, activeDays];
};

/**
 * Custom hooks to handle hours, for each day of the week, seleted by the user
 * for an experience
 */
export const useHourSlot = () => {
  const [hours, handleHours] = React.useState(
    Array.from({ length: 7 }, (_, i) => [UtilsDate.getCurrentTime()])
  );
  const updateHours = (e, day, hour) => {
    const value = e.target.value;
    let newArray = [...hours];
    newArray[day][hour] = value;
    handleHours(newArray);
  };
  const addHour = (day) => {
    let newArray = [...hours];
    newArray[day].push("");
    handleHours(newArray);
  };
  const removeHour = (day, hour) => {
    let newArray = [...hours];
    newArray[day] = newArray[day].filter((i, index) => index !== hour);
    handleHours(newArray);
  };
  return [hours, updateHours, addHour, removeHour];
};

/**
 * Custom hooks to handle the list of single date inserted by the user
 */
export const useDate = () => {
  const [dates, handleDates] = React.useState([UtilsDate.getTodayDate()]);

  const updateDate = (e, index) => {
    const value = e.target.value;
    let newArray = [...dates];
    newArray[index] = value;
    handleDates(newArray);
  };

  const addDate = () => {
    let newArray = [...dates];
    newArray.push("");
    handleDates(newArray);
  };
  const removeDate = (date) => {
    let newArray = [...dates];
    newArray = newArray.filter((i, index) => index !== date);
    handleDates(newArray);
  };

  return [dates, updateDate, addDate, removeDate];
};

/**
 * Function to add in the UI the days of the week and, for each day, the hour slot
 * selected by user
 * @param {*} param0
 */
export const buildChooseMoreDays = ({
  hours,
  updateHours,
  addHour,
  removeHour,
  enableDays,
  handleEnableDays,
}) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <ul className="list-group">
      {days.map((day, indexD) => (
        <li
          key={indexD}
          className={`list-group-item ${
            enableDays[indexD] && "list-group-item-primary"
          }`}
        >
          <p className="m-0" onClick={() => handleEnableDays(indexD)}>
            {window.dic(day)}
          </p>
          {enableDays[indexD] && (
            <div className="container text-center">
              {hours[indexD].map((h, indexH) => (
                <div key={indexH} className="d-flex align-items-center">
                  <input
                    className="form-control form-control-sm mb-1"
                    type="time"
                    onChange={(e) => updateHours(e, indexD, indexH)}
                    value={hours[indexD][indexH]}
                  />
                  <button
                    className="btn btn-link p-0 text-dark"
                    onClick={() => removeHour(indexD, indexH)}
                  >
                    <Icons.Trash d={1} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm w-75"
                onClick={() => addHour(indexD)}
              >
                <Icons.PlusCircle d={1} />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

/**
 * Function to add in the UI the list of dates added by the user
 * @param {*} param0
 */
export const buildChooseMoreDates = ({
  dates,
  updateDate,
  addDate,
  removeDate,
}) => {
  return (
    <ul className="list-group">
      <li className={`list-group-item text-center`}>
        {dates.map((date, index) => (
          <div key={index} className="d-flex align-items-center">
            <input
              className="form-control form-control-sm mb-1"
              type="datetime-local"
              value={date}
              onChange={(e) => updateDate(e, index)}
              placeholder="test"
            />
            {index !== 0 && (
              <button
                className="btn btn-link p-0 text-dark"
                onClick={() => removeDate(index)}
              >
                <Icons.Trash d={1} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm w-75"
          onClick={() => addDate()}
        >
          <Icons.PlusCircle d={1} />
        </button>
      </li>
    </ul>
  );
};
