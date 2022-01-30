import { userConstants } from "../constants";

const init_state = {
  list: [],
};

export function user(state = init_state, action) {
  let new_state = {};
  const id = localStorage.user ? JSON.parse(localStorage.user).id : null;
  new_state["list"] = [...state.list];
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      new_state["registering"] = true;
      break;
    case userConstants.REGISTER_SUCCESS:
      new_state["registered"] = true;
      break;
    case userConstants.REGISTER_FAILURE:
      break;

    case userConstants.GET_REQUEST:
      break;
    case userConstants.GET_SUCCESS:
      // Remove user if already present
      new_state.list = new_state.list.filter(
        (user) => user.id !== action.data.id
      );
      new_state.list.push(action.data);
      const index = new_state.list.length - 1;
      // Set variable to notify that for this user we have all details
      new_state.list[index]["detailed"] = true;
      // Change languages format
      new_state.list[index]["languages"] = (() => {
        let languagesString = "";
        new_state.list[index]["languages"].forEach((lang, i) => {
          languagesString += lang["language"] + ",";
        });
        return languagesString.substr(0, languagesString.length - 1);
      })();
      // Change interests format
      new_state.list[index]["interests"] = (() => {
        let allInterests = [];
        new_state.list[index]["interests"].forEach((inter, i) => {
          allInterests.push(inter["interest"]);
        });
        return allInterests;
      })();
      break;
    case userConstants.GET_FAILURE:
      break;
    case userConstants.GET_ALL_REQUEST:
      break;
    case userConstants.GET_ALL_SUCCESS:
      new_state.list = action.data;
      new_state.list.forEach((user) => {
        // Change languages format
        let languagesString = "";
        user["languages"].forEach((lang, i) => {
          languagesString += lang["language"] + ",";
        });
        user["languages"] = languagesString.substr(
          0,
          languagesString.length - 1
        );
      });
      break;
    case userConstants.GET_ALL_FAILURE:
      break;

    case userConstants.DELETE_REQUEST:
      new_state["deleting"] = true;
      break;
    case userConstants.DELETE_SUCCESS:
      localStorage.removeItem("user");
      new_state["deleted"] = true;
      break;
    case userConstants.DELETE_FAILURE:
      break;

    case userConstants.UPDATE_IMAGE_REQUEST:
      break;
    case userConstants.UPDATE_IMAGE_SUCCESS:
      new_state.list.filter((user) => user.id === id)[0]["image"] =
        action.data.image;
      break;
    case userConstants.UPDATE_IMAGE_FAILURE:
      break;

    case userConstants.UPDATE_USERNAME_REQUEST:
      break;
    case userConstants.UPDATE_USERNAME_SUCCESS:
      new_state.list.filter((user) => user.id === id)[0]["username"] =
        action.data.username;
      break;
    case userConstants.UPDATE_USERNAME_FAILURE:
      break;

    case userConstants.UPDATE_PASSWORD_REQUEST:
      break;
    case userConstants.UPDATE_PASSWORD_SUCCESS:
      break;
    case userConstants.UPDATE_PASSWORD_FAILURE:
      break;

    case userConstants.UPDATE_HOME_REQUEST:
      break;
    case userConstants.UPDATE_HOME_SUCCESS:
      if (action.data.home)
        new_state.list.filter((user) => user.id === id)[0]["home"] =
          action.data.home;
      break;
    case userConstants.UPDATE_HOME_FAILURE:
      break;

    case userConstants.UPDATE_LANGUAGES_REQUEST:
      break;
    case userConstants.UPDATE_LANGUAGES_SUCCESS:
      new_state.list.filter((user) => user.id === id)[0]["languages"] =
        action.data.languages;
      break;
    case userConstants.UPDATE_LANGUAGES_FAILURE:
      break;

    case userConstants.ADD_INTEREST_REQUEST:
      break;
    case userConstants.ADD_INTEREST_SUCCESS:
      new_state.list
        .filter((user) => user.id === id)[0]
      ["interests"].push(action.data.interest);
      break;
    case userConstants.ADD_INTEREST_FAILURE:
      break;

    case userConstants.DELETE_INTEREST_REQUEST:
      break;
    case userConstants.DELETE_INTEREST_SUCCESS:
      new_state.list.filter((user) => user.id === id)[0][
        "interests"
      ] = new_state.list
        .filter((user) => user.id === id)[0]
      ["interests"].filter((i) => i !== action.data.interest);
      break;
    case userConstants.DELETE_INTEREST_FAILURE:
      break;

    case userConstants.ADD_CITY_REQUEST:
      break;
    case userConstants.ADD_CITY_SUCCESS:
      new_state.list
        .filter((user) => user.id === id)[0]
      ["localities"].push(action.data.locality);
      break;
    case userConstants.ADD_CITY_FAILURE:
      break;

    case userConstants.DELETE_CITY_REQUEST:
      break;
    case userConstants.DELETE_CITY_SUCCESS:
      new_state.list.filter((user) => user.id === id)[0][
        "localities"
      ] = new_state.list
        .filter((user) => user.id === id)[0]
      ["localities"].filter((i) => i.id !== action.data.id);
      break;
    case userConstants.DELETE_CITY_FAILURE:
      break;
    case userConstants.RECOVER_PASSWORD_REQUEST:
      new_state["recovering"] = true;
      break;
    case userConstants.RECOVER_PASSWORD_SUCCESS:

      break;
    case userConstants.RECOVER_PASSWORD_FAILURE:
      break;
    default:
      break;
  }
  return new_state;
}
