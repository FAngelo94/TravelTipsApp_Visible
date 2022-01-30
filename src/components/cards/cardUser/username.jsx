import React from "react";
import { Icons } from "../../";

function Username({ dispatchUpdateUsername, user, editable }) {
  const [error, handleError] = React.useState(false);
  // Functions to update newUsername
  const [editUsername, handleEditUsername] = React.useState(false);
  const [newUsername, handleUsername] = React.useState(user.username);
  const updateUsername = (e) => {
    e.preventDefault();
    if (newUsername !== "" && newUsername !== user.username) {
      handleError(false);
      handleEditUsername(false);
      dispatchUpdateUsername(newUsername);
    } else if (newUsername !== "" && newUsername === user.username) {
      handleEditUsername(false);
      handleError(false);
    } else handleError(true);
  };

  return (
    <div>
      {!editUsername ? (
        <div className="d-flex justify-content-center align-items-center input-group-sm input-group mb-2">
          <Icons.Language d={2.5} />
          <p className="card-text text-center mb-0 ms-2 me-2 ">
            {user.username}
          </p>
          {editable && (
            <button
              className="btn btn-link p-0 text-dark"
              onClick={() => handleEditUsername(true)}
            >
              <Icons.Pencil d={1.3} />
            </button>
          )}
        </div>
      ) : (
        <form
          className="d-flex justify-content-center align-items-center mb-2 needs-validation mt-1"
          onSubmit={updateUsername}
        >
          <div className="input-group has-validation">
            <input
              className={`form-control me-2 form-control-sm ${
                newUsername !== "" ? "is-valid" : "is-invalid"
              }`}
              type="text"
              value={newUsername}
              onChange={(e) => handleUsername(e.target.value)}
              placeholder="newUsername"
              maxLength={32}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid new username")}
            </div>
          </div>
          <button className="btn btn-primary btn-sm text-dark" type="submit">
            {window.dic("Confirm")}
          </button>
        </form>
      )}
    </div>
  );
}

export default Username;
