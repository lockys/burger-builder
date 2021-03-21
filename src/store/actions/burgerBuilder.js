import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((res) => {
        dispatch(setIngredient(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFail());
      });
  };
};
