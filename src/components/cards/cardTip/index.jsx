import React from "react";
import Header from "../_header";
import FooterVote from "../_footerVote";

function CardTip({
  tip,
  history,
  updateFunction,
  deleteFunction,
  voteFunction,
}) {
  const _voteFunction = (vote) => {
    voteFunction({ id: tip.id, vote: vote });
  };

  const _deleteFunction = () => {
    deleteFunction(tip.id);
  };

  return (
    <div className="card mb-2 mt-2 mx-auto">
      <Header
        text={tip.username}
        id={tip.id}
        idOwner={tip.idUser}
        history={history}
        initInputs={tip}
        updateFunction={updateFunction}
        deleteFunction={_deleteFunction}
      />
      <div className="card-body bg-light p-2">
        <small className="text-muted">{tip.date}</small>
        <h5 className="card-title">{tip.title}</h5>
        <p className="card-text">{tip.text}</p>
        <div className="d-flex">
          <p className="card-text w-50 lh-1">
            <small className="text-muted">
              {tip.country}, {tip.province}, {tip.city}
            </small>
          </p>
          <p className="card-text  w-50 lh-1">
            <small className="text-muted">{tip.tags}</small>
          </p>
        </div>
        <p className="card-text lh-1">
          <small className="text-muted">{tip.languages}</small>
        </p>
      </div>

      <FooterVote
        average={tip.averageVote}
        voted={tip.voted}
        id={tip.id}
        voteFunction={_voteFunction}
      />
    </div>
  );
}

export default CardTip;
