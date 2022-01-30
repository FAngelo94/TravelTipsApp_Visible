import React from "react";
import Header from "../_header";
import FooterVote from "../_footerVote";
import { Carousel } from "../../index";
import { CardReview } from "../";

function CardPlace({
  place,
  history,
  showReview = false,
  voteFunction,
  likeFunction,
  updateReviewFunction,
  deleteReviewFunction
}) {
  const _voteFunction = (vote) => {
    voteFunction({ id: place.id, vote: vote });
  };
  const goToReviews = () => {
    history.push("/placeReviews/" + place.id);
  };
  return (
    <div className="card mb-2 mt-2 mx-auto">
      <Header id={place.id} history={history} />
      <div className="card-body bg-light p-2">
        <h5 className="card-title">{place.title}</h5>
        <Carousel images={place.images} id={place.id} />
        <p className="card-text">{place.text}</p>
        <div className="d-flex">
          <p className="card-text w-50 lh-1">
            <small className="text-muted">
              {place.country}, {place.province},{" "}
              {place.city}
            </small>
          </p>
          <p className="card-text  w-50 lh-1">
            <small className="text-muted">{place.tags}</small>
          </p>
        </div>
        {!showReview && (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => goToReviews()}
            >
              {window.dic("Read reviews")}
            </button>
          </div>
        )}
      </div>
      <FooterVote
        average={place.averageVote}
        voted={place.voted}
        id={place.id}
        voteFunction={_voteFunction}
      />
      {showReview &&
        place.reviews &&
        place.reviews.map((item, index) => (
          <CardReview key={index} review={item}
            history={history}
            likeFunction={likeFunction}
            updateReviewFunction={updateReviewFunction}
            deleteReviewFunction={deleteReviewFunction}
          />
        ))}
    </div>
  );
}

export default CardPlace;
