/* eslint-disable default-param-last */
import { IIngredient } from 'services/types/data';
import {
  DRAGGE_INGREDIENT,
  DRAGGE_BUN,
  DELETE_INGREDIENT,
  CLEAR_COSTRUCTOR,
  REORDER_CONSTRUCTOR,
  INCREASE_BUN,
  ADD_INGRIDIENT,
  TConstructorActions,
} from 'services/actions/constructor';

type TConstructorState = {
    draggedBun?: IIngredient;
    draggedIngredient: Array<IIngredient>;
}

export const initialState: TConstructorState = {
  draggedBun: undefined,
  draggedIngredient: [],
};

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case DRAGGE_INGREDIENT: {
      return {
        ...state,
        draggedIngredient: state.draggedIngredient
          ? [...state.draggedIngredient, ...action.ingredient.filter((ingredient: IIngredient) => ingredient._id === action._id)]
          : [...action.ingredient.filter((ingredient: IIngredient) => ingredient._id === action._id)],
      };
    }
    case DRAGGE_BUN: {
      return {
        ...state,
        draggedBun: action.ingredient.find((ingredient: IIngredient) => ingredient._id === action._id),
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        draggedIngredient: [...state.draggedIngredient].filter((ingredient) => ingredient.uniqueId !== action.uniqueId),
      };
    }
    case CLEAR_COSTRUCTOR: {
      return {
        draggedBun: undefined,
        draggedIngredient: [],
      };
    }
    case REORDER_CONSTRUCTOR: {
      return {
        ...state,
        ...state.draggedIngredient.splice(action.order, 1),
        ...state.draggedIngredient.splice(action.index, 0, action.item),
      };
    }
    case INCREASE_BUN: {
      return {
        ...state,
        draggedBun: state.draggedBun && { ...state.draggedBun, __v: 1 },
      };
    }
    case ADD_INGRIDIENT: {
      return {
        ...state,
        draggedIngredient: state.draggedIngredient ? [...state.draggedIngredient, action.payload] : [action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
