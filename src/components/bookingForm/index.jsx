import React from "react";
import { Icons, Modals } from "../";
import { CustomHooks } from "../../utils"

function BookingForm({ calendar,
  editable = false,
  idExperience,
  bookFunction,
  addDateFunction,
  removeDateFunction }) {

  // Variables to manage the add of new date
  const [dateAdd, handleDateAdd] = React.useState(new Date());
  const [dateAddPlaces, handleDateAddPlaces] = React.useState(0);
  const [clickedAdd, handleClickedAdd] = React.useState(false);
  const confirmNewDate = () => {
    handleClickedAdd(true);
    if (new Date() <= new Date(dateAdd) && dateAddPlaces > 0) {
      addDateFunction({
        date: dateAdd,
        id: idExperience,
        places: parseInt(dateAddPlaces)
      })
    }
  }

  //Variables to manage the deletion of a date
  const [deleteModalOpen, openModal, closeModal, deleteDate]= CustomHooks.useDeleteDateWithModal(removeDateFunction,idExperience);

  // Variables to manage the booking
  const [bookedPlaces, handleBookedPlaces, errorPlaces, indexDate, handleIndexDate] = CustomHooks.useBookDate(calendar);
  const handleBookDate = (index) => {
    if (index === indexDate)
      handleIndexDate(-1);
    else
      handleIndexDate(index);
  }
  const confirmBook = () => {
    if (!errorPlaces)
      bookFunction({
        date: calendar[indexDate].date,
        id: calendar[indexDate].idExperience,
        places: parseInt(bookedPlaces)
      })
  }

  return (
    <div className="container">

      <ul className="list-group has-validation mb-2">
        {calendar.map((item, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between${index === indexDate ? " active" : ""}`}
            onClick={() => handleBookDate(index)}
          >
            <span>{item.date.replace("T", " ")}</span>
            <span>{`${item.booked}/${item.availablePlaces}`}</span>
            {editable &&
              <span onClick={() => openModal(item.date)}>
                <Icons.X />
              </span>
            }
          </li>
        ))}
      </ul>

      {deleteModalOpen && (
        <Modals.CustomFunctionModal
          close={() => closeModal()}
          text={"Confirm the removal?"}
          okFunction={() => deleteDate()}
        />
      )}

      {indexDate !== -1 && indexDate < calendar.length &&
        <div className="d-flex input-group input-group-sm  has-validation mb-2">
          <input
            className={`form-control me-2${errorPlaces ? " is-invalid" : ""}`}
            type="number"
            placeholder={window.dic("Places")}
            value={bookedPlaces}
            onChange={handleBookedPlaces}
          />
          {bookedPlaces > (calendar[indexDate].availablePlaces - calendar[indexDate].booked) &&
            <div className="invalid-tooltip">
              {window.dic(
                "Places not available"
              )}
            </div>
          }
          {(bookedPlaces < 0 || bookedPlaces > 4) &&
            <div className="invalid-tooltip">
              {window.dic(
                "Number of places not valid (max 4)"
              )}
            </div>
          }
          <button type="button" className="btn btn-primary" onClick={confirmBook}>
            {window.dic("Book")}
          </button>
        </div>
      }

      {editable &&
        <div className="d-flex input-group input-group-sm mb-2">
          <input
            className={`form-control me-2 ${new Date() > new Date(dateAdd) && clickedAdd ? " is-invalid" : ""}`}
            type="datetime-local"
            placeholder="placeholder"
            name="date"
            value={dateAdd}
            onChange={e => handleDateAdd(e.target.value)}
          />
          <div className="invalid-tooltip">
            {window.dic(
              "Date not valid"
            )}
          </div>

          <input
            className={`form-control me-2${dateAddPlaces <= 0 && clickedAdd ? " is-invalid" : ""}`}
            type="number"
            placeholder={window.dic("Places")}
            value={dateAddPlaces}
            onChange={e => handleDateAddPlaces(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={confirmNewDate}>
            {window.dic("Add")}
          </button>
        </div>
      }

    </div>
  );
}

export default BookingForm;
