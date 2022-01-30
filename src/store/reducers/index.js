import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { alert } from "./alert.reducer";
import { registration } from "./registration.reducer";
import { tip } from "./tip.reducer";
import { city } from "./city.reducer";
import { itinerary } from "./itinerary.reducer";
import { experience } from "./experience.reducer";
import { user } from "./user.reducer";
import { place } from "./place.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  city,
  tip,
  itinerary,
  experience,
  user,
  place
});

export default rootReducer;
