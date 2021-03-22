import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  orders: [],
  purchased: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.id,
        }),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
