import React from "react";
import { Icons, InterestsList, LocalitiesList, Modals } from "../../";
import { UtilsUser } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/actions";

import ProfileImage from "./profileImage";
import Languages from "./languages";
import Home from "./home";
import UpdatePassword from "./updatePassword"
import Username from "./username"

function CardUser({ user, history }) {
  const editable = UtilsUser.checkIfOwner(user.id);
  const dispatch = useDispatch();

  // Functions for logging out
  useSelector((state) => {
    if (state.authentication.loggedOut) window.location.reload();
  });
  const logout = () => {
    dispatch(userActions.logout());
  };

  // Functions for deleting
  const [deleteModalOpen, handleDeleteModalStatus] = React.useState(false);
  const _delete = () => {
    dispatch(userActions.delete());
  };
  const deleted = useSelector((state) => state.user.deleted);
  React.useEffect(() => {
    if (deleted) {
      history.push("/");
    }
  }, [deleted]);

  // Functions to go to other page with id user like filter
  const historyPush = (link) => {
    const path = link + "usernameId=" + user.id;
    history.push(path);
  };

  return (
    <div className="card mb-2 mt-2 mx-auto">
      <div className="card-body bg-light p-2">
        <ProfileImage
          dispatchUpdateProfileImage={(data) =>
            dispatch(userActions.updateProfileImage(data))
          }
          user={user}
          editable={editable}
        />
        <Username dispatchUpdateUsername={(data) => dispatch(userActions.updateUsername(data))}
          user={user}
          editable={editable} />
        <Home
          dispatchUpdateHome={(data) => dispatch(userActions.updateHome(data))}
          user={user}
          editable={editable}
        />
        <Languages
          dispatchUpdateLanguages={(data) =>
            dispatch(userActions.updateLanguages(data))
          }
          user={user}
          editable={editable}
        />
        <div className="d-flex">
          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2 me-1 position-relative"
            onClick={() => historyPush("/experiences/")}
          >
            {window.dic("Experiences")} ({user.experiences})
            <div className="position-absolute end-0 top-50 translate-middle-y pe-2">
              <Icons.BoxArrowUpRight />
            </div>
          </button>
          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2 position-relative"
            onClick={() => historyPush("/travelers/")}
          >
            {window.dic("Matchings")} ({user.matchings})
            <div className="position-absolute end-0 top-50 translate-middle-y pe-2">
              <Icons.BoxArrowUpRight />
            </div>
          </button>
        </div>

        <div className="d-flex">
          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2 me-1 position-relative"
            onClick={() => historyPush("/itineraries/")}
          >
            {window.dic("Itineraries")} ({user.itineraries})
            <div className="position-absolute end-0 top-50 translate-middle-y pe-2">
              <Icons.BoxArrowUpRight />
            </div>
          </button>
          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2 position-relative"
            onClick={() => historyPush("/tips/")}
          >
            {window.dic("Tips")} ({user.tips})
            <div className="position-absolute end-0 top-50 translate-middle-y pe-2">
              <Icons.BoxArrowUpRight />
            </div>
          </button>
        </div>

        <div className="accordion mb-2" id="accordionExample">
          <div className="accordion-item border border-primary rounded-2">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                {window.dic("Interests")} ({user.interests.length})
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <InterestsList list={user.interests} editable={editable} />
              </div>
            </div>
          </div>
          <div className="accordion-item border border-primary rounded-2">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                {window.dic("Visited Places")} ({user.localities.length})
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <LocalitiesList list={user.localities} editable={editable} />
              </div>
            </div>
          </div>
        </div>
        {editable && <UpdatePassword dispatchUpdatePassword={(data) => dispatch(userActions.updatePassword(data))} />}
        {editable && (
          <div className="d-flex mt-3">
            {deleteModalOpen && (
              <Modals.CustomFunctionModal
                close={() => handleDeleteModalStatus(false)}
                text={"Confirm the removal?"}
                okFunction={() => _delete()}
              />
            )}
            <button
              className="btn btn-lg btn-secondary btn-sm w-100 mb-2 me-1"
              onClick={() => handleDeleteModalStatus(true)}
            >
              {window.dic("Delete profile")}
            </button>
            <button
              className="btn btn-lg btn-secondary btn-sm w-100 mb-2"
              onClick={() => logout()}
            >
              {window.dic("Logout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardUser;
