import React from "react";
import Header from "../_header";
import FooterVote from "../_footerVote";
import { BookingForm, Carousel } from "../../"
import { UtilsUser } from "../../../utils";

function CardExperience({
  experience,
  history,
  updateFunction,
  deleteFunction,
  voteFunction,
  bookFunction,
  addDateFunction,
  removeDateFunction,
}) {
  const _voteFunction = (vote) => {
    voteFunction({ id: experience.id, vote: vote });
  };

  const _deleteFunction = () => {
    deleteFunction(experience.id);
  };
  const editable = experience.idUser !== null ? UtilsUser.checkIfOwner(experience.idUser) : false;

  return (
    <div className="card mb-2 mt-2  mx-auto">
      <Header text={experience.username}
        id={experience.id}
        idOwner={experience.idUser}
        history={history}
        initInputs={experience}
        updateFunction={updateFunction}
        deleteFunction={_deleteFunction} />
      <div className="card-body bg-light p-2">
        <small className="text-muted">
          {experience.date}
        </small>
        <h5 className="card-title">{experience.title}</h5>
        <Carousel images={experience.images} id={experience.id} />
        <p className="card-text">
          {experience.text}
        </p>
        <div className="d-flex">
          <p className="card-text w-50 lh-1">
            <small className="text-muted">{experience.country}, {experience.province}, {experience.city}</small>
          </p>
          <p className="card-text  w-50 lh-1">
            <small className="text-muted">
              {experience.tags}
            </small>
          </p>
        </div>
      </div>
      <div className="accordion" id={"accordion" + experience.id}>
        <div className="accordion-item border">
          <h2
            className="accordion-header"
            id={"headingExperience" + experience.id}
          >
            <button
              className="accordion-button rounded-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseExperience0_" + experience.id}
              aria-expanded="false"
              aria-controls={"collapseExperience0_" + experience.id}
            >
              {window.dic("Read more")}
            </button>
          </h2>
          <div
            id={"collapseExperience0_" + experience.id}
            className="accordion-collapse collapse"
            aria-labelledby={"headingExperience" + experience.id}
            data-bs-parent={"#accordion" + experience.id}
          >
            <div className="accordion-body">{experience.longText.split("\n").map((t, index) => (
              t !== "" ?
                <div key={index}>{t}</div>
                :
                <br key={index}></br>
            ))}</div>
          </div>
        </div>

        <div className="accordion-item border">
          <h2 className="accordion-header" id={"headingExperience" + experience.id}>
            <button
              className="accordion-button rounded-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseExperience1_" + experience.id}
              aria-expanded="false"
              aria-controls={"collapseExperience1_" + experience.id}
            >
              {window.dic("Book this experience")}
            </button>
          </h2>
          <div
            id={"collapseExperience1_" + experience.id}
            className="accordion-collapse collapse"
            aria-labelledby={"headingExperience" + experience.id}
            data-bs-parent={"#accordion" + experience.id}
          >
            <div className="accordion-body">
              {experience.dates && 
              <BookingForm calendar={experience.dates} bookFunction={bookFunction} 
              addDateFunction={addDateFunction} removeDateFunction={removeDateFunction}
              idExperience={experience.id} editable={editable}/>}
            </div>
          </div>
        </div>
      </div>
      <FooterVote 
      average={experience.averageVote} 
      voted={experience.voted} 
      id={experience.id} 
      voteFunction={_voteFunction} />
    </div>
  );
}

export default CardExperience;
