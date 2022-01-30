import React from "react";
import { Page, AddFilterButtons, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { itineraryActions } from "../../store/actions";
import { UtilsUrl } from "../../utils";


function Itineraries(props) {
  const itineraries = useSelector((state) => state.itinerary.list);

  const filters = UtilsUrl.ReadFiltersInUrl();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!itineraries || itineraries.length === 0) dispatch(itineraryActions.get(filters));
  }, [dispatch]);

  const addFunction = (data)=>{
    dispatch(itineraryActions.add(data));
  }

  const updateFunction = (data)=>{
    dispatch(itineraryActions.update(data));
  }

  const deleteFunction = (data)=>{
    dispatch(itineraryActions.delete(data));
  }

  const voteFunction = (data)=>{
    dispatch(itineraryActions.updateVote(data));
  }
  
  return (
    <Page props={props} title="Itineraries" enableBottom={true}>
      <AddFilterButtons history={props.history} props={props} titleModal="Add new itinerary" addFunction={addFunction}/>
      {itineraries.map((item,index) => (
        <Cards.CardItinerary key={index} itinerary={item} history={props.history} updateFunction={updateFunction} deleteFunction={deleteFunction} voteFunction={voteFunction}/>
      ))}
    </Page>
  );
}

export default Itineraries;
