import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../../store/actions";

/**
 * Modal to show message, expecially errors, coming from server
 */
function AlertServerModal() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(alertActions.clear());
  };

  return (
    <div
      className={`modal bg-black-ts-50 ${alert.message ? "d-block" : ""}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className={`modal-title ${
                alert.type === "success" ? "text-success" : "text-danger"
              }`}
            >
              {alert.type === "success" ? window.dic("Success") : window.dic("Error")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeAlert}
            ></button>
          </div>
          <div className="modal-body">
            <p>{alert.message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeAlert}
            >
              {window.dic("Close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertServerModal;
