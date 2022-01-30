import { placeConstants } from "../constants";
import { placeService } from "../services";
import { alertActions } from ".";

export const placeActions = {
  add,
  addReview,
  delete: _delete,
  deleteReview,
  get,
  getReview,
  update,
  updateReview,
  updateReviewLike,
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
    placeService.add(data).then((reply) => {
      if (reply.status === 200) {
        dispatch(success({ ...data, id: reply.id}));
      } else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.ADD_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.ADD_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.ADD_FAILURE, error };
  }
}

function addReview(data) {
  return (dispatch) => {
    
    dispatch(request(data));
    placeService.addReview(data).then((reply) => {
      if (reply.status === 200) {
        dispatch(success({ ...data, id: reply.id}));
      } else {
        _printError(dispatch, failure, reply);
      }
    });
  };
  function request(data) {
    return { type: placeConstants.ADD_REVIEW_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.ADD_REVIEW_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.ADD_REVIEW_FAILURE, error };
  }
}

function get(data) {
  return (dispatch) => {
    dispatch(request(data));
    placeService.get(data).then((reply) => {
      if (reply.status === 200) dispatch(success(reply.places));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.GET_FAILURE, error };
  }
}

function getReview(data) {
  return (dispatch) => {
    dispatch(request(data));
    placeService.getReview(data).then((reply) => {
      if (reply.status === 200) dispatch(success({id:data,reviews: reply.reviews}));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.GET_REVIEW_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.GET_REVIEW_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.GET_REVIEW_FAILURE, error };
  }
}

function _delete(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.delete(data).then((reply) => {
      if (reply.status === 200) dispatch(success({id: data}));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.DELETE_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.DELETE_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.DELETE_FAILURE, error };
  }
}

function deleteReview(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.deleteReview(data).then((reply) => {
      if (reply.status === 200) dispatch(success({id: data}));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.DELETE_REVIEW_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.DELETE_REVIEW_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.DELETE_REVIEW_FAILURE, error };
  }
}

function update(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.update(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.UPDATE_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.UPDATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.UPDATE_FAILURE, error };
  }
}

function updateReview(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.updateReview(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.UPDATE_REVIEW_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.UPDATE_REVIEW_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.UPDATE_REVIEW_FAILURE, error };
  }
}

function updateReviewLike(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.updateReviewLike(data).then((reply) => {
      if (reply.status === 200) dispatch(success(data));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.UPDATE_REVIEW_LIKE_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.UPDATE_REVIEW_LIKE_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.UPDATE_REVIEW_LIKE_FAILURE, error };
  }
}

function updateVote(data) {
  return (dispatch) => {
    
    dispatch(request(data));

    placeService.updateVote(data.id, data.vote).then((reply) => {
      if (reply.status === 200) dispatch(success(reply));
      else {
        _printError(dispatch, failure, reply);
      }
    });
  };

  function request(data) {
    return { type: placeConstants.UPDATE_VOTE_REQUEST, data };
  }
  function success(data) {
    return { type: placeConstants.UPDATE_VOTE_SUCCESS, data };
  }
  function failure(error) {
    return { type: placeConstants.UPDATE_VOTE_FAILURE, error };
  }
}
