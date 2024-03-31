/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-confusing-arrow */
/* eslint-disable default-param-last */
import { IIngredient } from 'services/types/data';
import {
  GET_INGREDIENT,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_ERROR,
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_ERROR,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  CLEAR_QUANTITY,
  TIngredientActions,
  CLEAR_ORDER_NUMBER,
} from 'services/actions/ingredient';

type TIngredientState = {
    ingredientRequest: boolean,
    ingredientFailed: boolean,
    ingredient: Array<IIngredient>,

    orderNumberRequest: boolean,
    orderNumberFailed: boolean,
    orderNumber: number,
}

export const initialState: TIngredientState = {
  ingredientRequest: false,
  ingredientFailed: false,
  ingredient: [],

  orderNumberRequest: false,
  orderNumberFailed: false,
  orderNumber: 0,
};

export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
  switch (action.type) {
    case GET_INGREDIENT: {
      return {
        ...state,
        ingredientRequest: true,
        ingredientFailed: false,
      };
    }
    case GET_INGREDIENT_SUCCESS: {
      return {
        ...state,
        ingredient: action.ingredient,
        ingredientRequest: false,
      };
    }
    case GET_INGREDIENT_ERROR: {
      return {
        ...initialState,
        ingredientFailed: true,
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumberFailed: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
      };
    }
    case GET_ORDER_NUMBER_ERROR: {
      return {
        ...state,
        orderNumberFailed: true,
        orderNumberRequest: false,
        orderNumber: 0,
      };
    }
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        ingredient: [...state.ingredient].map((item) => item._id === action.id ? { ...item, __v: ++item.__v } : item),
      };
    }
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        ingredient: [...state.ingredient].map((item) => item._id === action.id ? { ...item, __v: --item.__v } : item),
      };
    }
    case CLEAR_QUANTITY: {
      return {
        ...state,
        ingredient: [...state.ingredient].map((item) => item.__v > 0 ? { ...item, __v: 0 } : item),
      };
    }
    case CLEAR_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: 0,
      };
    }
    default: {
      return state;
    }
  }
};
