import { cityConstants } from "../constants";
import { cityService } from "../services";
import { alertActions } from ".";

export const cityActions = {
  get
};

function _printError(dispatch, failure, replyError) {
  const alertError = replyError.detail ? replyError.detail : replyError;
  dispatch(failure(alertError));
  dispatch(alertActions.error(alertError));
}

function get(data) {
  return (dispatch) => {
    dispatch(request(data));
    cityService.get(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.cities));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: cityConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: cityConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: cityConstants.GET_FAILURE, error };
  }
}
