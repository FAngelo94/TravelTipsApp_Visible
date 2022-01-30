import React from "react";
import { Icons } from "../..";
import { userActions } from "../../../store/actions";
import { useDispatch } from "react-redux";

function InterestsList({ list, editable }) {
  const dispatch = useDispatch();
  const [error, handleError] = React.useState(false);

  // Function to update interests
  const [newInterest, handleNewInterest] = React.useState("");
  const addInterest = (e) => {
    e.preventDefault();
    if (newInterest !== "" && list.indexOf(newInterest) === -1) {
      handleError(false);
      dispatch(userActions.addInterest(newInterest));
      handleNewInterest("");
    } else handleError(true);
  };
  const deleteInterest = (name) => {
    dispatch(userActions.deleteInterest(name));
  };

  return (
    <div className="text-center">
      {editable && (
        <form
          className="mb-4 needs-validation"
          onSubmit={(e) => addInterest(e)}
        >
          <div className="d-flex input-group input-group-sm  has-validation">
            <input
              className={`form-control me-2 ${error && "is-invalid"}`}
              type="text"
              value={newInterest}
              onChange={(e) => {
                if (e.target.value !== "" && error) handleError(false);
                handleNewInterest(e.target.value);
              }}
              maxLength={16}
              placeholder={window.dic("New Interest")}
            />
            {error && newInterest === "" && (
              <div className="invalid-tooltip">
                {window.dic("Insert something to add")}
              </div>
            )}
            {error && list.indexOf(newInterest) !== -1 && (
              <div className="invalid-tooltip">
                {window.dic("You already added this interest")}
              </div>
            )}
            <button className="btn btn-primary" type="submit">
              {window.dic("Add")}
            </button>
          </div>
        </form>
      )}
      {list.map((item, index) => (
        <span key={index} className="badge rounded-pill bg-secondary me-1">
          {item}
          {editable && (
            <span onClick={() => deleteInterest(item)}>
              <Icons.X />
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default InterestsList;
