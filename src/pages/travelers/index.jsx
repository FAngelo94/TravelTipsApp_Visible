import React from "react";
import { Page, AddFilterButtons, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { UtilsUser } from "../../utils";

function Travelers(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  const dispatchStar = (otherUser, valueStar) => {
    dispatch(userActions.star({otherUser,valueStar}))
  }

  let travelers = useSelector((state) => state.user.list);
  if (travelers)
    travelers = travelers.filter((user) => !UtilsUser.checkIfOwner(user.id));
  return (
    <Page props={props} title="Travelers" enableBottom={true}>
      <AddFilterButtons history={props.history} disableAdd={true} />
      {travelers &&
        travelers.map((item, index) => (
          <Cards.CardTraveler
            key={index}
            traveler={item}
            history={props.history}
            dispatchStar = {dispatchStar}
          />
        ))}
    </Page>
  );
}

export default Travelers;
