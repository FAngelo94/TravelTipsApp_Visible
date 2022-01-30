import { itineraryConstants } from "../constants";
import { itineraryService } from "../services";
import { alertActions } from ".";

export const itineraryActions = {
  add,
  get,
  delete: _delete,
  update,
  updateVote,
};

function _printError(dispatch, failure, replyError) {
  const alertError = replyError.detail ? replyError.detail : replyError;
  dispatch(failure(alertError));
  dispatch(alertActions.error(alertError));
}

function add(data) {
  return (dispatch) => {
    
    dispatch(request(data));
    itineraryService.add(data).then((reply) => {
      if (reply.status === 200) {
        const username = JSON.parse(localStorage.getItem("user")).username;
        const id = JSON.parse(localStorage.getItem("user")).id;
        dispatch(success({ ...data, id: reply.id, date: reply.date, username: username, idUser: id}));
      } else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: itineraryConstants.ADD_REQUEST, data };
  }
  function success(data) {
    return { type: itineraryConstants.ADD_SUCCESS, data };
  }
  function failure(error) {
    return { type: itineraryConstants.ADD_FAILURE, error };
  }
}

function get(data) {
  return (dispatch) => {
    dispatch(request(data));
    itineraryService.get(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.itineraries));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: itineraryConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: itineraryConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: itineraryConstants.GET_FAILURE, error };
  }
}

function _delete(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    itineraryService.delete(data).then((reply) => {
      if (reply.status === 200) dispatch(success({id: data}));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: itineraryConstants.DELETE_REQUEST, data };
  }
  function success(data) {
    return { type: itineraryConstants.DELETE_SUCCESS, data };
  }
  function failure(error) {
    return { type: itineraryConstants.DELETE_FAILURE, error };
  }
}

function update(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    itineraryService.update(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: itineraryConstants.UPDATE_REQUEST, data };
  }
  function success(data) {
    return { type: itineraryConstants.UPDATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: itineraryConstants.UPDATE_FAILURE, error };
  }
}

function updateVote(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    itineraryService.updateVote(data.id, data.vote).then((reply) => {
      if (reply.status === 200) dispatch(success(reply));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: itineraryConstants.UPDATE_VOTE_REQUEST, data };
  }
  function success(data) {
    return { type: itineraryConstants.UPDATE_VOTE_SUCCESS, data };
  }
  function failure(error) {
    return { type: itineraryConstants.UPDATE_VOTE_FAILURE, error };
  }
}
