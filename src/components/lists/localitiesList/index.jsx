import React from "react";
import { Icons } from "../..";
import { userActions } from "../../../store/actions";
import { useDispatch } from "react-redux";

function LocalitiesList({ list, editable }) {
  const dispatch = useDispatch();
  const [error, handleError] = React.useState(false);

  // Functions to update cities visited
  const [newLocality, handleNewLocality] = React.useState({
    country: "",
    province: "",
    city: "",
  });

  const checkIfNewLocalityIsInTheList = () => {
    let check = false;
    list.forEach((item) => {
      if (
        item.country === newLocality.country &&
        item.province === newLocality.province &&
        item.city === newLocality.city
      )
        check = true;
    });
    return check;
  };

  const addLocalityVisited = (e) => {
    e.preventDefault();
    if (
      newLocality.country !== "" &&
      newLocality.province !== "" &&
      newLocality.city !== "" &&
      !checkIfNewLocalityIsInTheList()
    ) {
      
      dispatch(userActions.addLocality(newLocality));
      handleError(false);
      handleNewLocality({ country: "", province: "", city: "" });

    } else handleError(true);
  };
  const deleteLocalityVisited = (id) => {
    dispatch(userActions.deleteLocality(id));
  };

  return (
    <div className="text-center">
      {editable && (
        <form
          className="mb-4 needs-validation"
          onSubmit={(e) => addLocalityVisited(e)}
        >
          <div className="d-flex mb-2">
            <div className="input-group input-group-sm has-validation">
              <input
                className={`form-control me-2 ${
                  error && newLocality.country === "" && "is-invalid"
                }`}
                type="text"
                value={newLocality.country}
                onChange={(e) => {
                  handleNewLocality({
                    country: e.target.value,
                    province: newLocality.province,
                    city: newLocality.city,
                  });
                }}
                placeholder={window.dic("Country")}
                maxLength={32}
              />
              <div className="invalid-tooltip">
                {window.dic("Insert a country")}
              </div>
            </div>
            <div className="input-group input-group-sm has-validation">
              <input
                className={`form-control ${
                  error && newLocality.province === "" && "is-invalid"
                }`}
                type="text"
                value={newLocality.province}
                onChange={(e) => {
                  handleNewLocality({
                    country: newLocality.country,
                    province: e.target.value,
                    city: newLocality.city,
                  });
                }}
                maxLength={32}
                placeholder={window.dic("Province")}
              />
              <div className="invalid-tooltip">
                {window.dic("Insert a province")}
              </div>
            </div>
          </div>
          <div className="d-flex input-group input-group-sm ">
            <input
              className={`form-control me-2 ${
                error && "is-invalid"
              }`}
              type="text"
              value={newLocality.city}
              onChange={(e) => {
                handleError(false)
                handleNewLocality({
                  country: newLocality.country,
                  province: newLocality.province,
                  city: e.target.value,
                });
              }}
              maxLength={32}
              placeholder={window.dic("City")}
            />
            {error && newLocality.city === "" && (
              <div className="invalid-tooltip">
                {window.dic("Insert a city")}
              </div>
            )}
            {error && checkIfNewLocalityIsInTheList() && (
              <div className="invalid-tooltip">
                {window.dic("You already have this city in your list")}
              </div>
            )}
            <button className="btn btn-primary " type="submit">
              {window.dic("Add")}
            </button>
          </div>
        </form>
      )}
      <ul className="list-group">
        {list.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            {`${item.country}, ${item.province}, ${item.city}`}{" "}
            {editable && (
              <span onClick={() => deleteLocalityVisited(item.id)}>
                <Icons.X />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalitiesList;
