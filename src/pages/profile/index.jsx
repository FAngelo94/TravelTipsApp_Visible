import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Page, Cards } from "../../components";
import { userActions } from "../../store/actions";

function Profile(props) {
  const id = parseInt(useParams().id);
  const users = useSelector((state) => state.user.list);
  const profile = users.filter((p) => p.id === id)[0];

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!profile || !profile.detailed) dispatch(userActions.get(id));
  }, []);

  return (
    <Page props={props}>
      {profile && profile.detailed && (
        <Cards.CardUser user={profile} history={props.history} />
      )}
    </Page>
  );
}

export default Profile;
