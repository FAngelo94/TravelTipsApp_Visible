import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";

export const userActions = {
  get,
  getAll,
  login,
  logout,
  register,
  recoverPassword,
  delete: _delete,
  updateProfileImage,
  updateLanguages,
  updateHome,
  addInterest,
  deleteInterest,
  addLocality,
  deleteLocality,
  star,
  updateUsername,
  updatePassword
};

function get(id) {
  return (dispatch) => {
    dispatch(request({ id }));

    userService.get(id).then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data.user));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.GET_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.GET_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request({ }));

    userService.getAll().then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data.users));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.GET_ALL_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.GET_ALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_ALL_FAILURE, error };
  }
}

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (data) => {
        if (data.id !== undefined && data.token) {
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return (dispatch) => {
    
    dispatch(request());

    userService.logout().then(
      (data) => {
        if (data.status && data.status !== 200) {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        } else {
          dispatch(success(data));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.LOGOUT_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.LOGOUT_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGOUT_FAILURE, error };
  }
}

function register(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.register(data).then(
      (data) => {
        if (data.status === 201) {
          dispatch(success(data));
          dispatch(alertActions.success(data.message));
        } else {
          dispatch(failure(data.detail));
          dispatch(alertActions.error(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };
  function request(data) {
    return { type: userConstants.REGISTER_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.REGISTER_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete() {
  
  return (dispatch) => {
    dispatch(request());
    userService.delete().then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data));
        } else {
          dispatch(failure(data.detail));
          dispatch(alertActions.error(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };
  function request(data) {
    return { type: userConstants.DELETE_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.DELETE_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.DELETE_FAILURE, error };
  }
}

function updateProfileImage(image) {
  return (dispatch) => {
    
    dispatch(request({  image }));

    userService.updateProfileImage( image).then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.UPDATE_IMAGE_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.UPDATE_IMAGE_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_IMAGE_FAILURE, error };
  }
}

function updateHome(home) {
  return (dispatch) => {
    
    dispatch(request({  home }));

    userService.updateHome( home).then(
      (data) => {
        if (data.status === 200) {
          data["home"] = home;
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.UPDATE_HOME_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.UPDATE_HOME_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_HOME_FAILURE, error };
  }
}

function updateLanguages(languages) {
  return (dispatch) => {
    
    dispatch(request({  languages }));

    userService.updateLanguages( languages).then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.UPDATE_LANGUAGES_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.UPDATE_LANGUAGES_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_LANGUAGES_FAILURE, error };
  }
}

function addInterest(interest) {
  return (dispatch) => {
    
    dispatch(request({  interest }));

    userService.addInterest( interest).then(
      (data) => {
        if (data.status === 200) {
          data["interest"] = interest;
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.ADD_INTEREST_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.ADD_INTEREST_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.ADD_INTEREST_FAILURE, error };
  }
}

function deleteInterest(interest) {
  return (dispatch) => {
    
    dispatch(request({  interest }));

    userService.deleteInterest( interest).then(
      (data) => {
        if (data.status === 200) {
          data["interest"] = interest;
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.DELETE_INTEREST_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.DELETE_INTEREST_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.DELETE_INTEREST_FAILURE, error };
  }
}

function addLocality(locality) {
  return (dispatch) => {
    
    dispatch(request({ locality}));

    userService.addLocality( locality).then(
      (data) => {
        if (data.status===200) {
          data['locality'] = locality;
          data['locality']['id'] = data.idLocality
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.ADD_CITY_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.ADD_CITY_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.ADD_CITY_FAILURE, error };
  }
}

function deleteLocality(locality) {
  return (dispatch) => {
    
    dispatch(request({ locality}));

    userService.deleteLocality( locality).then(
      (data) => {
        if (data.status===200) {
          data['id'] = locality;
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.DELETE_CITY_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.DELETE_CITY_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.DELETE_CITY_FAILURE, error };
  }
}

function updateUsername(username) {
  return (dispatch) => {
    
    dispatch(request({  username }));

    userService.updateUsername( username).then(
      (data) => {
        if (data.status === 200) {
          data["username"] = username;
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.UPDATE_USERNAME_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.UPDATE_USERNAME_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USERNAME_FAILURE, error };
  }
}

function updatePassword(data) {
  return (dispatch) => {
    
    dispatch(request({  }));

    userService.updatePassword( data).then(
      (data) => {
        if (data.status === 200) {
          dispatch(success(data));
          dispatch(alertActions.success(data.message));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.UPDATE_PASSWORD_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.UPDATE_PASSWORD_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_PASSWORD_FAILURE, error };
  }
}

function star(data) {
  return (dispatch) => {
    
    dispatch(request({ data}));

    userService.star( data).then(
      (data) => {
        if (data.status===200) {
          dispatch(success(data));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.STAR_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.STAR_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.STAR_FAILURE, error };
  }
}

function recoverPassword(email) {
  return (dispatch) => {
    
    dispatch(request({email}));

    userService.recoverPassword(email).then(
      (data) => {
        if (data.status===200) {
          dispatch(success(data));
          dispatch(alertActions.success(data.message));
        } else {
          dispatch(alertActions.error(data.detail));
          dispatch(failure(data.detail));
        }
      },
      (error) => {
        dispatch(failure("Connection Error"));
        dispatch(alertActions.error("Connection Error"));
      }
    );
  };

  function request(data) {
    return { type: userConstants.RECOVER_PASSWORD_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.RECOVER_PASSWORD_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.RECOVER_PASSWORD_FAILURE, error };
  }
}