import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-instance';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, admin, balance) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    admin: admin,
    balance: balance
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const updateBalance = (balance) => {
  return {
    type: actionTypes.UPDATE_BALANCE,
    balance: balance
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

//set timer to logout when token expires
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    }
    let url = 'users/signup';

    if (!isSignUp) {
      url = 'users/login';
    }

    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('admin', response.data.admin);
        localStorage.setItem('balance', response.data.balance);
        dispatch(authSuccess(response.data.token, response.data.userId, response.data.admin, response.data.balance));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        //preload template and response redux stores
        dispatch(actions.fetchTemplates());
        dispatch(actions.fetchResponses(response.data.userId));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

//check for presence of unexpired token in localStorage on starting App
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        let admin = localStorage.getItem('admin');
        let balance = localStorage.getItem('balance');
        //convert admin back to boolean
        admin = admin === 'true' ? true : false;
        dispatch(authSuccess(token, userId, admin, balance));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        //preload templates redux store
        dispatch(actions.fetchTemplates(admin));
        dispatch(actions.fetchResponses(userId));
      }
    }
  }
}

export const getUserData = (userId) => {
  return dispatch => {
    axios.get('/users/' + userId)
      .then(response => {
        dispatch(updateBalance(response.data.balance));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
}