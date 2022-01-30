import { experienceConstants } from "../constants";
import { experienceService } from "../services";
import { alertActions } from ".";

export const experienceActions = {
  add,
  get,
  getBooked,
  delete: _delete,
  deleteBookDate,
  deleteDate,
  update,
  putBookDate,
  putDate,
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
    experienceService.add(data).then((reply) => {
      if (reply.status === 200) {
        const username = JSON.parse(localStorage.getItem("user")).username;
        const id = JSON.parse(localStorage.getItem("user")).id;
        dispatch(success({ ...data, id: reply.id, date: reply.date, username: username, idUser: id }));
      } else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.ADD_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.ADD_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.ADD_FAILURE, error };
  }
}

function get(data) {
  return (dispatch) => {
    dispatch(request(data));
    experienceService.get(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.experiences));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.GET_FAILURE, error };
  }
}

function getBooked(data) {
  return (dispatch) => {
    dispatch(request(data));
    experienceService.getBooked(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.experiences));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.GET_BOOKED_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.GET_BOOKED_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.GET_BOOKED_FAILURE, error };
  }
}

function _delete(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.delete(data).then((reply) => {
      if (reply.status === 200) dispatch(success({ id: data }));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.DELETE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.DELETE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.DELETE_FAILURE, error };
  }
}

function deleteBookDate(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.deleteBookDate(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.DELETE_BOOK_DATE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.DELETE_BOOK_DATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.DELETE_BOOK_DATE_FAILURE, error };
  }
}

function deleteDate(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.deleteDate(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.DELETE_DATE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.DELETE_DATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.DELETE_DATE_FAILURE, error };
  }
}

function update(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.update(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.UPDATE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.UPDATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_FAILURE, error };
  }
}

function putBookDate(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.putBookDate(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.PUT_BOOK_DATE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.PUT_BOOK_DATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.PUT_BOOK_DATE_FAILURE, error };
  }
}

function putDate(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.putDate(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.PUT_DATE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.PUT_DATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.PUT_DATE_FAILURE, error };
  }
}

function updateVote(data) {
  return (dispatch) => {

    dispatch(request(data));

    experienceService.updateVote(data.id, data.vote).then((reply) => {
      if (reply.status === 200) dispatch(success(reply));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: experienceConstants.UPDATE_VOTE_REQUEST, data };
  }
  function success(data) {
    return { type: experienceConstants.UPDATE_VOTE_SUCCESS, data };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_VOTE_FAILURE, error };
  }
}
