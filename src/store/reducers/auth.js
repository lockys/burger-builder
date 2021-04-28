import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
