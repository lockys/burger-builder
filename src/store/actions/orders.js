import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBugerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData,
  };
};

export const purchaseBugerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', orderData)
      .then((res) => {
        dispatch(purchaseBugerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBugerFailed(err));
      });
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json')
      .then((res) => {
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
