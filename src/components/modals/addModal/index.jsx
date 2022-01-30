import React from "react";
import routes from "../../../routes";
import { CustomHooks, UtilsDate } from "../../../utils";
import {
  useDaysOfWeeks,
  useHourSlot,
  useDate,
  buildChooseMoreDays,
  buildChooseMoreDates,
} from "./date";
import { fieldIsInvalid } from "./fieldsValidation";

/**
 * Function to customize the input fields based on the page where
 * we are (tips, itineraries, experiences, ...)
 * @param {*} type
 * @param {*} initInputs
 */
const buildFields = (type, initInputs, creation) => {
  if (type === routes.placeReviews.key) {
    return [
      {
        placeholder: window.dic("Text"),
        name: "text",
        type: "textarea",
        value: initInputs.text || "",
      },
    ];
  }
  let fields = [
    {
      placeholder: window.dic("Title"),
      name: "title",
      maxLength: 64,
      value: initInputs.title || "",
      errorMessage: window.dic("Insert a title"),
    },
    {
      placeholder: window.dic("Text"),
      name: "text",
      type: "textarea",
      maxLength: type === routes.tips.key ? 300 : 128,
      value: initInputs.text || "",
      errorMessage: window.dic("Insert a test"),
    },
    {
      placeholder: window.dic("Country"),
      name: "country",
      maxLength: 64,
      value: initInputs.country || "",
      errorMessage: window.dic("Insert a country"),
    },
    {
      placeholder: window.dic("Province"),
      name: "province",
      maxLength: 64,
      value: initInputs.province || "",
      errorMessage: window.dic("Insert a province"),
    },
    {
      placeholder: window.dic("City"),
      name: "city",
      maxLength: 64,
      value: initInputs.city || "",
      errorMessage: window.dic("Insert a city"),
    },
    {
      placeholder: window.dic("Languages used (Italiano,English,...)"),
      name: "languages",
      value:
        (initInputs.languages && initInputs.languages.replaceAll(", ", ",")) ||
        "",
      errorMessage: window.dic(
        'You must add at least 1 language using this format: "italian,english,..."; max length for language: 32 characters'
      ),
    },
    {
      placeholder: "Tags (tag1,tag2, ...)",
      name: "tags",
      value:
        (initInputs.tags &&
          initInputs.tags.replaceAll(" ", ",").replaceAll("#", "")) ||
        "",
      errorMessage: window.dic(
        'You must add at least 1 tag using this format: "tag1,tag2,..."; max length for tag: 16 characters'
      ),
    },
  ];

  if (type === routes.itineraries.key || type === routes.experiences.key) {
    fields.splice(2, 0, {
      placeholder: window.dic("Long text"),
      name: "longText",
      type: "textarea",
      value: initInputs.longText || "",
      errorMessage: window.dic("Insert a test"),
    });
  }

  if (type === routes.experiences.key && creation) {
    fields.push({
      placeholder: window.dic("Available places"),
      name: "availablePlaces",
      type: "number",
      value: initInputs.availablePlaces || "",
    });
  }

  if (type === routes.places.key || type === routes.itineraries.key || type === routes.experiences.key)
    fields.push({
      name: "multiplefiles",
      type: "multiplefiles",
      errorMessage: window.dic("Select at least one image (max 7): jpeg, jpg or png"),
    });

  /* if (type === routes.experiences.key)
    fields.push({
      name: "file",
      type: "file",
      errorMessage: window.dic("Select one image: jpeg, jpg or png"),
    }); */

  return fields;
};

function AddModal({
  close,
  initInputs = {},
  history,
  title = "",
  nameFunction = "Add",
  primaryFunction = null,
  creation = true
}) {
  const urlPage = history.location.pathname.split("/")[1];
  
  const fields = buildFields(urlPage, initInputs, creation);
  const [inputs, setInputs] = CustomHooks.useStatusFields(fields);
  const [switchDate, handleSwitchDate] = React.useState(false);

  // These 2 custom useState is used to add periodic day
  const [enableDays, handleEnableDays] = useDaysOfWeeks();
  const [hours, updateHours, addHour, removeHour] = useHourSlot();

  // These custom useState is used to add specific days
  const [dates, updateDate, addDate, removeDate] = useDate();

  const addDatesToInput = (newInputs) => {
    let datesInput = [];

    if (switchDate) {
      // Periodic experience
      for (let i = 0; i < 7; i++) {
        let day = new Date();
        day.setDate(day.getDate() + i);
        let dayOfTheWeek = day.getDay();
        if (enableDays[dayOfTheWeek]) {
          for (let w = 0; w < 4; w++) {
            hours[dayOfTheWeek].forEach(h => {
              let tmpDay = day;
              const [hour, minute] = h.split(":");
              tmpDay.setHours(hour, minute);
              datesInput.push({
                date: UtilsDate.printDate(day),
                availablePlaces: parseInt(inputs['availablePlaces'])
              })
            })
            day.setDate(day.getDate() + 7);
          }
        }
      }
    } else {
      dates.forEach(d => {
        datesInput.push({
          date: d,
          availablePlaces: parseInt(inputs['availablePlaces'])
        })
      });
    }
    newInputs['dates'] = datesInput;
    return newInputs;
  }

  const [primaryPressed, handlePrimaryPressed] = React.useState(false);
  const onClickPrimary = () => {
    let fieldsAreValid = true;
    fields.forEach((f) => {
      if (fieldIsInvalid(f.name, inputs[f.name])) fieldsAreValid = false;
    });
    handlePrimaryPressed(true);
    if (primaryFunction && fieldsAreValid) {
      let newInputs = { ...inputs };
      if (urlPage === routes.experiences.key)
        newInputs = addDatesToInput();
      delete newInputs['file'];
      delete newInputs['availablePlaces'];
      close(false);
      primaryFunction(newInputs);
    }
  };

  return (
    <div className={`modal bg-black-ts-50 d-block`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content h-75v">
          -
          <div className="modal-header">
            <div className="h2 m-0">{window.dic(title)}</div>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => close(false)}
            ></button>
          </div>
          <div className="modal-body overflow-auto">
            {fields.map((item, index) =>
              item.type === "textarea" ? (
                <div
                  className="input-group input-group-sm mb-1 has-validation"
                  key={index}
                >
                  <textarea
                    className={`form-control ${primaryPressed &&
                      fieldIsInvalid(item.name, inputs[item.name]) &&
                      "is-invalid"
                      }`}
                    rows="5"
                    placeholder={item.placeholder}
                    value={inputs[item.name]}
                    name={item.name}
                    onChange={setInputs}
                    maxLength={item.maxLength}
                  ></textarea>
                  {item.errorMessage && (
                    <div className="invalid-tooltip">{item.errorMessage}</div>
                  )}
                </div>
              ) : item.type === "multiplefiles" ? (
                <div
                  className="input-group input-group-sm mb-1 has-validation"
                  key={index}
                >
                  <p htmlFor="formFile" className="form-label w-100 fs-7">
                    {window.dic("Select at least one image (max 7): jpeg, jpg or png")}
                  </p>
                  <input
                    key={index}
                    className={`form-control ${primaryPressed &&
                      fieldIsInvalid(item.name, inputs[item.name]) &&
                      "is-invalid"
                      }`}
                    type="file"
                    placeholder={item.placeholder}
                    value={inputs[item.name]}
                    name={item.name}
                    onChange={setInputs}
                    multiple
                    accept=".jpeg,.jpg,.png"
                  />
                  {item.errorMessage && (
                    <div className="invalid-tooltip">{item.errorMessage}</div>
                  )}
                </div>
              ) : item.type === "file" ? (
                <div
                  className="input-group input-group-sm mb-1 has-validation"
                  key={index}
                >
                  <label htmlFor="formfile" className="form-label fs-7">
                    {window.dic("Select one image: jpeg, jpg or png")}
                  </label>
                  <input
                    key={index}
                    className={`form-control ${primaryPressed &&
                      fieldIsInvalid(item.name, inputs[item.name]) &&
                      "is-invalid"
                      }`}
                    type="file"
                    placeholder={item.placeholder}
                    value={inputs[item.name]}
                    name={item.name}
                    onChange={setInputs}
                    accept=".jpeg,.jpg,.png"
                  />
                  {item.errorMessage && (
                    <div className="invalid-tooltip">{item.errorMessage}</div>
                  )}
                </div>
              ) : (
                <div
                  className="input-group input-group-sm mb-1 has-validation"
                  key={index}
                >
                  <input
                    key={index}
                    className={`form-control ${primaryPressed &&
                      fieldIsInvalid(item.name, inputs[item.name]) &&
                      "is-invalid"
                      }`}
                    type={item.type}
                    placeholder={item.placeholder}
                    value={inputs[item.name]}
                    name={item.name}
                    onChange={setInputs}
                    maxLength={item.maxLength}
                  />
                  {item.errorMessage && (
                    <div className="invalid-tooltip">{item.errorMessage}</div>
                  )}
                </div>
              )
            )}
            {urlPage === routes.experiences.key && creation && (
              <div className="form-check form-switch p-0 align-items-center d-flex justify-content-between">
                <label
                  className="form-check-label w-75"
                  htmlFor="flexSwitchCheckAddModal"
                >
                  {window.dic(
                    "Select days for a periodic experience in the next 4 weeks"
                  )}
                </label>
                <input
                  className="form-check-input form-check-input-xl"
                  type="checkbox"
                  id="flexSwitchCheckAddModal"
                  onChange={() => handleSwitchDate(!switchDate)}
                />
              </div>
            )}

            {!switchDate &&
              urlPage === routes.experiences.key && creation &&
              buildChooseMoreDates({
                dates,
                updateDate,
                addDate,
                removeDate,
              })}
            {switchDate &&
              urlPage === routes.experiences.key && creation &&
              buildChooseMoreDays({
                hours,
                updateHours,
                addHour,
                removeHour,
                enableDays,
                handleEnableDays,
              })}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>
              {window.dic("Close")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickPrimary}
            >
              {window.dic(nameFunction)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
