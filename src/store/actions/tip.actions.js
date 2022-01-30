import { tipConstants } from "../constants";
import { tipService } from "../services";
import { alertActions } from ".";

export const tipActions = {
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
    tipService.add(data).then((reply) => {
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
    return { type: tipConstants.ADD_REQUEST, data };
  }
  function success(data) {
    return { type: tipConstants.ADD_SUCCESS, data };
  }
  function failure(error) {
    return { type: tipConstants.ADD_FAILURE, error };
  }
}

function get(data) {
  return (dispatch) => {
    dispatch(request(data));
    tipService.get(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.tips));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: tipConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: tipConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: tipConstants.GET_FAILURE, error };
  }
}

function _delete(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    tipService.delete(data).then((reply) => {
      if (reply.status === 200) dispatch(success({id: data}));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: tipConstants.DELETE_REQUEST, data };
  }
  function success(data) {
    return { type: tipConstants.DELETE_SUCCESS, data };
  }
  function failure(error) {
    return { type: tipConstants.DELETE_FAILURE, error };
  }
}

function update(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    tipService.update(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: tipConstants.UPDATE_REQUEST, data };
  }
  function success(data) {
    return { type: tipConstants.UPDATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: tipConstants.UPDATE_FAILURE, error };
  }
}

function updateVote(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    tipService.updateVote(data.id, data.vote).then((reply) => {
      if (reply.status === 200) dispatch(success(reply));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: tipConstants.UPDATE_VOTE_REQUEST, data };
  }
  function success(data) {
    return { type: tipConstants.UPDATE_VOTE_SUCCESS, data };
  }
  function failure(error) {
    return { type: tipConstants.UPDATE_VOTE_FAILURE, error };
  }
}
