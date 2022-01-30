import React from "react";

function Loader({ props }) {
  const [show, handleShow] = React.useState(false);
  window.loaderShow = (status) => handleShow(status);
  return (
    <div
      className={`position-fixed w-100 h-100 bg-black-ts-50 start-0 top-0 z-index-1100 ${
        !show && "d-none"
      }`}
    >
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        {[0, 0, 0, 0, 0].map((value, index) => {
          return <div className="spinner-grow text-primary me-2" role="status"></div>;
        })}
      </div>
    </div>
  );
}

export default Loader;
