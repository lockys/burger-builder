import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: authData,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const setAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authInfo = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const key = 'AIzaSyCZh4IVH6NS8CtyKbwjngRVEP-tO1_HX18';

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

  if (!isSignup) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
  }

  axios
    .post(url, authInfo)
    .then((res) => {
      dispatch(authSuccess(res.data));
      dispatch(setAuthTimeout(res.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFailed(error.response.data.error));
    });
};
