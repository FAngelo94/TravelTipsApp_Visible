import React from "react";
import { Page, AddFilterButtons, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { placeActions } from "../../store/actions";
import { useParams } from "react-router-dom";

function PlaceReviews(props) {
  const { id } = useParams();
  const [readReviews, handleReadReviews] = React.useState(false);

  const places = useSelector((state) => state.place.list) || [];
  const item = places.filter((x) => x.id === parseInt(id))[0];

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!places || places.length === 0) dispatch(placeActions.get({}));
  }, [dispatch]);

  React.useEffect(() => {
    if (item && !readReviews) {
      dispatch(placeActions.getReview(item.id));
      handleReadReviews(true)
    }
  }, [item]);

  const addReviewFunction = (data) => {
    data.idPlace = parseInt(id)
    dispatch(placeActions.addReview(data));
  }

  const deleteReviewFunction = (data) => {
    dispatch(placeActions.deleteReview(data));
  }

  const updateReviewFunction = (data) => {
    dispatch(placeActions.updateReview(data));
  }

  const likeFunction = (data) => {
    dispatch(placeActions.updateReviewLike(data));
  }

  const voteFunction = (data) => {
    dispatch(placeActions.updateVote(data));
  }

  return (
    <Page props={props} title="Place Reviews" enableBottom={true}>
      <AddFilterButtons history={props.history} props={props}
        addFunction={addReviewFunction}
        disableFilter={true}
        titleModal="Add new review" />
      {item && <Cards.CardPlace
        place={item}
        history={props.history}
        showReview={true}
        voteFunction={voteFunction}
        likeFunction={likeFunction}
        updateReviewFunction={updateReviewFunction}
        deleteReviewFunction={deleteReviewFunction}
      />}
    </Page>
  );
}

export default PlaceReviews;
