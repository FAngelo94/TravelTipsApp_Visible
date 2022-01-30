import React from "react";
import { Page, AddFilterButtons, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { placeActions } from "../../store/actions";
import { UtilsUrl } from "../../utils";



function Places(props) {
  const places = useSelector((state) => state.place.list);

  const filters = UtilsUrl.ReadFiltersInUrl();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!places || places.length === 0) dispatch(placeActions.get(filters));
  }, [dispatch]);

  const addFunction = (data) => {
    dispatch(placeActions.add(data));
  }

  const voteFunction = (data) => {
    dispatch(placeActions.updateVote(data));
  }

  return (
    <Page props={props} title="Places" enableBottom={true}>
      <AddFilterButtons
        history={props.history}
        props={props}
        titleModal="Suggest new place"
        addFunction={addFunction}
      />
      {places &&
        places.map((item, index) => (
          <Cards.CardPlace key={index} place={item} 
          history={props.history} 
          voteFunction={voteFunction}/>
        ))}
    </Page>
  );
}

export default Places;
