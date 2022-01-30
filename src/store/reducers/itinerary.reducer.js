import { itineraryConstants } from "../constants";

const init_state = {
  list: [],
};

export function itinerary(state = init_state, action) {
  let new_state = {};
  new_state["list"] = [...state["list"]];
  switch (action.type) {
    case itineraryConstants.ADD_REQUEST:
      new_state["requesting"] = true;
      break;
    case itineraryConstants.ADD_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = [action.data, ...new_state["list"]];
      new_state["list"][0]["tags"] = "#" + action.data.tags.replace(",", " #");
      new_state["list"][0]["languages"] = action.data.languages.replace(",", ", ");
      //TODO finish update: new_state["list"][0]["images"] = action
      break;
    case itineraryConstants.ADD_FAILURE:
      break;
    case itineraryConstants.GET_REQUEST:
      new_state["requesting"] = true;
      break;
    case itineraryConstants.GET_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = action.data;
      new_state["list"].forEach((itinerary, i) => {
        // change date format
        itinerary["date"] = itinerary["date"].replace("T", " ");
      });
      break;
    case itineraryConstants.GET_FAILURE:
      break;
    case itineraryConstants.DELETE_REQUEST:
      new_state["requesting"] = true;
      break;
    case itineraryConstants.DELETE_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = new_state["list"].filter(
        (itinerary) => itinerary.id !== action.data.id
      );
      break;
    case itineraryConstants.DELETE_FAILURE:
      break;
    case itineraryConstants.UPDATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case itineraryConstants.UPDATE_SUCCESS:
      new_state["completed"] = true;
      for (let i = 0; i < new_state["list"].length; i++) {
        if (new_state["list"][i]["id"] === action.data.id) {
          new_state["list"][i]["city"] = action.data.city;
          new_state["list"][i]["country"] = action.data.country;
          new_state["list"][i]["languages"] = action.data.languages.replace(",",", ");
          new_state["list"][i]["province"] = action.data.province;
          new_state["list"][i]["tags"] =
            "#" + action.data.tags.replace(",", " #");
          new_state["list"][i]["text"] = action.data.text;
          new_state["list"][i]["title"] = action.data.title;
        }
      }
      break;
    case itineraryConstants.UPDATE_FAILURE:
      break;
    case itineraryConstants.UPDATE_VOTE_REQUEST:
      new_state["requesting"] = true;
      break;
    case itineraryConstants.UPDATE_VOTE_SUCCESS:
      new_state["completed"] = true;
      break;
    case itineraryConstants.UPDATE_VOTE_FAILURE:
      break;
    default:
      break;
  }
  return new_state;
}
