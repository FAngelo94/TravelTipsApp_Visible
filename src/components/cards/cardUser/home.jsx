import React from "react";
import { Icons } from "../../";

function Home({ dispatchUpdateHome, user, editable }) {
  // Functions to update home
  const [editHome, handleEditHome] = React.useState(false);
  const [newHome, handleNewHome] = React.useState(user.home);
  const updateHome = () => {
    handleEditHome(false);
    if (
      newHome.country !== user.home.country ||
      newHome.province !== user.home.province ||
      newHome.city !== user.home.city
    ) {
      dispatchUpdateHome(newHome);
    }
  };

  return (
    <div>
      {!editHome ? (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Icons.GeoAltFill d={1.2} />
          <p className="card-text  text-center mb-0 ms-2 me-2">
            {user.home.country || user.home.province || user.home.city
              ? user.home.country +
                ", " +
                user.home.province +
                ", " +
                user.home.city
              : editable
              ? window.dic("Insert where do you live")
              : "-"}
          </p>
          {editable && (
            <button
              className="btn btn-link p-0 text-dark"
              onClick={() => handleEditHome(true)}
            >
              <Icons.Pencil d={1.3} />
            </button>
          )}
        </div>
      ) : (
        <form className="mb-2">
          <div className="input-group input-group-sm mb-2">
            <input
              className="form-control me-2"
              type="text"
              placeholder={window.dic("Country")}
              value={newHome.country}
              onChange={(e) =>
                handleNewHome({
                  country: e.target.value,
                  province: newHome.province,
                  city: newHome.city,
                })
              }
              maxLength={64}
            />
            <input
              className="form-control"
              type="text"
              placeholder={window.dic("Province")}
              value={newHome.province}
              onChange={(e) =>
                handleNewHome({
                  country: newHome.country,
                  province: e.target.value,
                  city: newHome.city,
                })
              }
              maxLength={64}
            />
          </div>
          <div className="input-group input-group-sm">
            <input
              className="form-control me-2"
              type="text"
              placeholder={window.dic("City")}
              value={newHome.city}
              onChange={(e) =>
                handleNewHome({
                  country: newHome.country,
                  province: newHome.province,
                  city: e.target.value,
                })
              }
              maxLength={64}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => updateHome()}
              type="button"
            >
              {window.dic("Confirm")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Home;
