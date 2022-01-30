import React from "react";

function RedirectToLoginModal({ props }) {
  const [alertIsVisible, handleShowAlert] = React.useState(false);
  window.showRedirectToLoginModal = () => {
    handleShowAlert(true);
  };

  return (
    <div
      className={`modal bg-black-ts-50 ${alertIsVisible && "d-block"}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className={`modal-title text-primary`}>
              {window.dic("Warning")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleShowAlert(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              {window.dic(
                "You must login to interact with the contents or create new contents inside Traveltips"
              )}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleShowAlert(false)}
            >
              {window.dic("Close")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                props.history.push("/login/");
              }}
            >
              {window.dic("Go to login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedirectToLoginModal;
