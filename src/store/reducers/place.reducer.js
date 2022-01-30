import { placeConstants } from "../constants";

const init_state = {
  list: [],
};

export function place(state = init_state, action) {
  let new_state = {};
  new_state["list"] = [...state["list"]];
  switch (action.type) {
    case placeConstants.ADD_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.ADD_SUCCESS:
      new_state["completed"] = true;
      break;
    case placeConstants.ADD_FAILURE:
      break;
    case placeConstants.GET_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.GET_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = action.data;
      break;
    case placeConstants.GET_FAILURE:
      break;
    case placeConstants.DELETE_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.DELETE_SUCCESS:
      new_state["completed"] = true;
      break;
    case placeConstants.DELETE_FAILURE:
      break;
    case placeConstants.UPDATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.UPDATE_SUCCESS:
      new_state["completed"] = true;
      break;
    case placeConstants.UPDATE_FAILURE:
      break;
    case placeConstants.ADD_REVIEW_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.ADD_REVIEW_SUCCESS:
      new_state["completed"] = true;
      window.location.reload()
      break;
    case placeConstants.ADD_REVIEW_FAILURE:
      break;
    case placeConstants.GET_REVIEW_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.GET_REVIEW_SUCCESS:
      new_state["completed"] = true;
      new_state["list"].map(p => {
        if (p.id === action.data.id)
          p["reviews"] = action.data.reviews;
      });
      break;
    case placeConstants.GET_REVIEW_FAILURE:
      break;
    case placeConstants.DELETE_REVIEW_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.DELETE_REVIEW_SUCCESS:
      new_state["completed"] = true;
      window.location.reload()
      break;
    case placeConstants.DELETE_REVIEW_FAILURE:
      break;
    case placeConstants.UPDATE_REVIEW_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.UPDATE_REVIEW_SUCCESS:
      new_state["completed"] = true;
      window.location.reload()
      break;
    case placeConstants.UPDATE_REVIEW_FAILURE:
      break;
    case placeConstants.UPDATE_REVIEW_LIKE_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.UPDATE_REVIEW_LIKE_SUCCESS:
      new_state["completed"] = true;
      break;
    case placeConstants.UPDATE_REVIEW_LIKE_FAILURE:
      break;
    case placeConstants.UPDATE_VOTE_REQUEST:
      new_state["requesting"] = true;
      break;
    case placeConstants.UPDATE_VOTE_SUCCESS:
      new_state["completed"] = true;
      break;
    case placeConstants.UPDATE_VOTE_FAILURE:
      break;
    default:
      break;
  }
  return new_state;
}
