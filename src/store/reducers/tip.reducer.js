import { tipConstants } from "../constants";

const init_state = {
  list: [],
};

export function tip(state = init_state, action) {
  let new_state = {};
  new_state["list"] = [...state["list"]];
  switch (action.type) {
    case tipConstants.ADD_REQUEST:
      new_state["requesting"] = true;
      break;
    case tipConstants.ADD_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = [action.data, ...new_state["list"]];
      new_state["list"][0]["tags"] = "#" + action.data.tags.replace(",", " #");
      new_state["list"][0]["languages"] = "#" + action.data.languages.replace(",", ", ");
      break;
    case tipConstants.ADD_FAILURE:
      break;
    case tipConstants.GET_REQUEST:
      new_state["requesting"] = true;
      break;
    case tipConstants.GET_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = action.data;
      new_state["list"].forEach((tip, i) => {
        // change date format
        tip["date"] = tip["date"].replace("T", " ");
      });
      break;
    case tipConstants.GET_FAILURE:
      break;
    case tipConstants.DELETE_REQUEST:
      new_state["requesting"] = true;
      break;
    case tipConstants.DELETE_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = new_state["list"].filter(
        (tip) => tip.id !== action.data.id
      );
      break;
    case tipConstants.DELETE_FAILURE:
      break;
    case tipConstants.UPDATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case tipConstants.UPDATE_SUCCESS:
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
    case tipConstants.UPDATE_FAILURE:
      break;
    case tipConstants.UPDATE_VOTE_REQUEST:
      new_state["requesting"] = true;
      break;
    case tipConstants.UPDATE_VOTE_SUCCESS:
      new_state["completed"] = true;
      break;
    case tipConstants.UPDATE_VOTE_FAILURE:
      break;
    default:
      break;
  }
  return new_state;
}
