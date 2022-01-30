import React from "react";
import { Icons } from "../..";
import { UtilsUser } from "../../../utils";

function CardTraveler({ traveler, history,dispatchStar }) {
  const [followedStatus, handleFollowedStatus] = React.useState(
    traveler.followed || false
  );
  //const goToUser = () => {}; TODO develop it
  const followUser = () => {
    if (UtilsUser.checkIfLogged()) handleFollowedStatus(!followedStatus);
    else window.showRedirectToLoginModal();
    //TODO call server
    dispatchStar(traveler.id, !followedStatus)
  };

  const goToUser = () => {
    history.push("/profile/" + traveler.id);
  };

  return (
    <div className="card mb-3 mx-auto" key={traveler.id}>
      <div className="row">
        <div className="col-4 d-flex" onClick={() => goToUser()}>
          <div className="responsive-container r-4-3 m-auto">
            <img
              src={traveler.image ? window.images_url + traveler.image : `https://robohash.org/${traveler.username}?set=set4`}
              className="img-fluid responsive-child-centered"
              alt="..."
            />
          </div>
        </div>
        <div className="col-6">
          <div className="card-body d-flex flex-column justify-content-around pe-0 ps-0">
            <p className="card-text m-0" onClick={() => goToUser()}>
              {traveler.username}
            </p>
            <p className="card-text m-0 d-flex flex-column">
              <small className="text-muted">{traveler.languages}</small>
              <small className="text-muted">
                {traveler.home.country}, {traveler.home.province},{" "}
                {traveler.home.city}
              </small>
            </p>
          </div>
        </div>
        <div className="col-2 d-flex align-items-center">
          <button type="button" className="btn p-0" onClick={followUser}>
            {!followedStatus ? <Icons.Star /> : <Icons.StarFill />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardTraveler;
