import React from "react";

function UpdatePassword({ dispatchUpdatePassword }) {
  const [error, handleError] = React.useState(false);
  const [newPassword, handleNewPassword] = React.useState("");
  const [newPassword2, handleNewPassword2] = React.useState("");
  const [oldPassword, handleOldPassword] = React.useState("");

  const newPasswordIsValid = newPassword !== "" && newPassword.length >= 6;
  const newPassword2IsValid = newPassword2 !== "";
  const newPasswordsEqual = newPassword2 === newPassword;
  const oldPasswordIsValid = oldPassword !== "";

  const updatePassword = () => {
    if (newPasswordIsValid && newPasswordsEqual && oldPasswordIsValid) {
      handleError(false);
      dispatchUpdatePassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
    } else handleError(true);
  };

  return (
    <form className="mb-2 needs-validation">
      <div className="input-group input-group-sm  mb-2">
        <input
          className={`form-control me-2 ${
            error && !newPasswordIsValid && "is-invalid"
          }`}
          type="password"
          placeholder={window.dic("New password")}
          value={newPassword}
          onChange={(e) => handleNewPassword(e.target.value)}
          maxLength={32}
        />
        <div className="invalid-tooltip">
          {window.dic(
            "Please choose a valid password with at least 6 characters"
          )}
        </div>
        <input
          className={`form-control ${
            error &&
            (!newPassword2IsValid || !newPasswordsEqual) &&
            "is-invalid"
          }`}
          type="password"
          placeholder={window.dic("Confirm new password")}
          value={newPassword2}
          onChange={(e) => handleNewPassword2(e.target.value)}
          maxLength={32}
        />
        <div className="invalid-tooltip">
          {!newPasswordIsValid &&
            window.dic(
              "Please choose a valid password with at least 6 characters"
            )}
          {newPasswordIsValid &&
            newPassword2IsValid &&
            !newPasswordsEqual &&
            window.dic("The two passwords do not match")}
          {newPasswordIsValid &&
            !newPassword2IsValid &&
            window.dic("Please confirm password")}
        </div>
      </div>
      <div className="input-group input-group-sm">
        <input
          className={`form-control me-2 ${
            error && !oldPasswordIsValid && "is-invalid"
          }`}
          type="password"
          placeholder={window.dic("Current password")}
          value={oldPassword}
          onChange={(e) => handleOldPassword(e.target.value)}
        />
        <div className="invalid-tooltip">
          {window.dic("Please insert your current password")}
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => updatePassword()}
          type="button"
        >
          {window.dic("Update")}
        </button>
      </div>
    </form>
  );
}

export default UpdatePassword;
