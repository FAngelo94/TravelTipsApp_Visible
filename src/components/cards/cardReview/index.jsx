import React from "react";
import { Icons, Modals } from "../../";
import { UtilsUser } from "../../../utils";

function CardReview({
  review,
  history,
  likeFunction,
  updateReviewFunction,
  deleteReviewFunction }) {
  const [AddModalOpen, handleAddModalStatus] = React.useState(false);
  const [TrashModalOpen, handleTrashModalStatus] = React.useState(false);

  const updateFunction = (data) => {
    data.idReview = review.id;
    updateReviewFunction(data);
  }

  const [currentLike, handleCurrentLike] = React.useState(review.liked);
  const updateLike = (value) => {
    let likeValue = value;
    if (UtilsUser.checkIfLogged()) {
      if (currentLike === 1) {
        if (value === 1) {
          handleCurrentLike(0);
          likeValue = 0;
        }
        else
          handleCurrentLike(value);
      }
      if (currentLike === -1) {
        if (value === -1) {
          handleCurrentLike(0); likeValue = 0;
        }
        else
          handleCurrentLike(value);
      }
      if (currentLike === 0) handleCurrentLike(value);

      likeFunction({
        idReview: review.id,
        like: likeValue
      })
    } else {
      window.showRedirectToLoginModal();
    }
  };

  const goToUser = () => {
    history.push("/profile/" + review.idUser);
  };

  const editable =
    review.idUser !== null ? UtilsUser.checkIfOwner(review.idUser) : false;

  return (
    <div className="card">
      {editable && AddModalOpen && (
        <Modals.AddModal
          history={history}
          close={() => handleAddModalStatus(false)}
          title={"Modify"}
          nameFunction={"Modify"}
          primaryFunction={updateFunction}
          initInputs={review}
        />
      )}
      {editable && TrashModalOpen && (
        <Modals.CustomFunctionModal
          close={() => handleTrashModalStatus(false)}
          text={"Confirm the removal?"}
          okFunction={() => deleteReviewFunction(review.id)}
        />
      )}
      <div className="card-body p-2">
        {editable && (
          <div className="d-flex justify-content-end">
            <button
              className="navbar-toggler p-0 border-0 me-3"
              onClick={() => handleAddModalStatus(true)}
            >
              <Icons.Pencil />
            </button>
            <button className="navbar-toggler p-0 border-0 me-1"
              onClick={() => handleTrashModalStatus(true)}>
              <Icons.Trash />
            </button>
          </div>
        )}
        <h6 className="card-title" onClick={() => goToUser()}>
          {review.username}
        </h6>
        <p className="card-text">{review.text}</p>
        <div className="d-flex justify-content-end">
          <button
            className="navbar-toggler p-0 border-0 me-1"
            onClick={() => updateLike(1)}
          >
            {currentLike === 1 ? <Icons.ThumbUpFill /> : <Icons.ThumbUp />}
          </button>
          {currentLike == 1 ? review.likes + 1 : review.likes}
          <button
            className="navbar-toggler p-0 border-0 me-1 ms-2"
            onClick={() => updateLike(-1)}
          >
            {currentLike === -1 ? (
              <Icons.ThumbDownFill />
            ) : (
              <Icons.ThumbDown />
            )}
          </button>
          {currentLike == -1 ? review.unlikes + 1 : review.unlikes}
        </div>
      </div>
    </div>
  );
}

export default CardReview;
