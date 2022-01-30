import React from "react";
import Header from "../_header";
import FooterVote from "../_footerVote";
import { Carousel } from "../../index";

function CardItinerary({
  itinerary,
  history,
  updateFunction,
  deleteFunction,
  voteFunction,
}) {
  const _voteFunction = (vote) => {
    voteFunction({ id: itinerary.id, vote: vote });
  };

  const _deleteFunction = () => {
    deleteFunction(itinerary.id);
  };

  return (
    <div className="card mb-2 mt-2  mx-auto">
      <Header
        text={itinerary.username}
        id={itinerary.id}
        idOwner={itinerary.idUser}
        history={history}
        initInputs={itinerary}
        updateFunction={updateFunction}
        deleteFunction={_deleteFunction}
      />
      <div className="card-body bg-light p-2">
        <small className="text-muted">{itinerary.date}</small>
        <h5 className="card-title">{itinerary.title}</h5>
        <Carousel images={itinerary.images} id={itinerary.id} />
        <p className="card-text">{itinerary.text}</p>
        <div className="d-flex">
          <p className="card-text w-50 lh-1">
            <small className="text-muted">
              {itinerary.country}, {itinerary.province}, {itinerary.city}
            </small>
          </p>
          <p className="card-text  w-50 lh-1">
            <small className="text-muted">{itinerary.tags}</small>
          </p>
        </div>
        <p className="card-text lh-1">
          <small className="text-muted">{itinerary.languages}</small>
        </p>
      </div>
      <div className="accordion" id={"accordion" + itinerary.id}>
        <div className="accordion-item border">
          <h2
            className="accordion-header"
            id={"headingItinerary" + itinerary.id}
          >
            <button
              className="accordion-button rounded-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseItinerary" + itinerary.id}
              aria-expanded="false"
              aria-controls={"collapseItinerary" + itinerary.id}
            >
              {window.dic("Read more")}
            </button>
          </h2>
          <div
            id={"collapseItinerary" + itinerary.id}
            className="accordion-collapse collapse"
            aria-labelledby={"headingItinerary" + itinerary.id}
            data-bs-parent={"#accordion" + itinerary.id}
          >
            <div className="accordion-body">{itinerary.longText.split("\n").map((t,index) =>(
              t != "" ?
              <div key={index}>{t}</div>
              :
              <br key={index}></br>
            ))}</div>
          </div>
        </div>
      </div>

      <FooterVote
        average={itinerary.averageVote}
        voted={itinerary.voted}
        id={itinerary.id}
        voteFunction={_voteFunction}
      />
    </div>
  );
}

export default CardItinerary;
