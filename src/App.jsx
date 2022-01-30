import "./App.css";
import routes from "./routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useIntl } from "react-intl";

import {
  About,
  Cities,
  Experiences,
  ForgottenPassword,
  Home,
  Itineraries,
  Login,
  Travelers,
  Profile,
  Places,
  PlaceReviews,
  PageNotFound,
  Registration,
  Tips,
} from "./pages";

function App(props) {
  // Create global variable for dictionary and set language
  const { formatMessage } = useIntl();
  window.dic = (id) => formatMessage({ id });

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.about.path}
          exact
          render={(props) => <About {...props} />}
        />
        <Route
          path={routes.login.path}
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path={routes.registration.path}
          exact
          render={(props) => <Registration {...props} />}
        />
        <Route
          path={routes.home.path}
          exact
          render={(props) => <Home {...props} />}
        />
        <Route
          path={routes.profile.path}
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route
          path={routes.cities.path}
          exact
          render={(props) => <Cities {...props} />}
        />
        <Route
          path={routes.tips.path}
          exact
          render={(props) => <Tips {...props} />}
        />
        <Route
          path={routes.itineraries.path}
          exact
          render={(props) => <Itineraries {...props} />}
        />
        <Route
          path={routes.experiences.path}
          exact
          render={(props) => <Experiences {...props} />}
        />
        <Route
          path={routes.travelers.path}
          exact
          render={(props) => <Travelers {...props} />}
        />
        <Route
          path={routes.places.path}
          exact
          render={(props) => <Places {...props} />}
        />
        <Route
          path={routes.placeReviews.path}
          exact
          render={(props) => <PlaceReviews {...props} />}
        />
        <Route
          path={routes.forgottenPassword.path}
          exact
          render={(props) => <ForgottenPassword {...props} />}
        />
        <Route path="*" render={(props) => <PageNotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
