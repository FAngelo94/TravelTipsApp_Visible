import { userConstants } from "../constants";

export function authentication(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        loggedIn: true,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT_REQUEST:
      return {
        loggingOut: true,
      };
    case userConstants.LOGOUT_SUCCESS:
      localStorage.removeItem("user");
      return {
        loggedOut: true,
      };
    case userConstants.LOGOUT_FAILURE:
      localStorage.removeItem("user");
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
