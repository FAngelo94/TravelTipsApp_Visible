import React from "react";

function CustomFunctionModal({
  title = "Warning",
  close,
  text = "",
  okFunction = null,
}) {

  return (
    <div
      className={`modal bg-black-ts-50 d-block`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className={`modal-title text-primary`}>{window.dic(title)}</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={close}
            ></button>
          </div>
          <div className="modal-body">
            <p>{window.dic(text)}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={close}
            >
              {window.dic("Close")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={okFunction}
            >
              {window.dic("Confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFunctionModal;
