import React from "react";
import { Page, AddFilterButtons, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { tipActions } from "../../store/actions";
import { UtilsUrl } from "../../utils";

function Tips(props) {
  const tips = useSelector((state) => state.tip.list);

  const filters = UtilsUrl.ReadFiltersInUrl();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!tips || tips.length === 0) dispatch(tipActions.get(filters));
  }, [dispatch]);

  const addFunction = (data)=>{
    dispatch(tipActions.add(data));
  }

  const updateFunction = (data)=>{
    dispatch(tipActions.update(data));
  }

  const deleteFunction = (data)=>{
    dispatch(tipActions.delete(data));
  }

  const voteFunction = (data)=>{
    dispatch(tipActions.updateVote(data));
  }

  return (
    <Page props={props} title="Tips" enableBottom={true}>
      <AddFilterButtons
        history={props.history}
        props={props}
        titleModal="Add new tip"
        addFunction={addFunction}
      />
      {tips &&
        typeof tips === "object" &&
        tips.map((item, index) => (
          <Cards.CardTip key={index} tip={item} history={props.history} updateFunction={updateFunction} deleteFunction={deleteFunction} voteFunction={voteFunction}/>
        ))}
    </Page>
  );
}

export default Tips;
