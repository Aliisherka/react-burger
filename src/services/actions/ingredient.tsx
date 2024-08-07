import { request } from 'utils/request';
import { AppThunkAction } from 'services/types';
import { IIngredient } from 'services/types/data';
import { CLEAR_COSTRUCTOR } from 'services/actions/constructor';
import { CLOSE_ORDER, OPER_ERROR_ORDER } from 'services/actions/modal';

export const GET_INGREDIENT = 'GET_INGREDIENT';
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_ERROR = 'GET_INGREDIENT_ERROR';

export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const CLEAR_QUANTITY = 'CLEAR_QUANTITY';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export interface IGET_INGREDIENT {
    readonly type: typeof GET_INGREDIENT;
}
export interface IGET_INGREDIENT_SUCCESS {
    readonly type: typeof GET_INGREDIENT_SUCCESS;
    readonly ingredient: IIngredient[];
}
export interface IGET_INGREDIENT_ERROR {
    readonly type: typeof GET_INGREDIENT_ERROR;
}
export interface IGET_ORDER_NUMBER {
    readonly type: typeof GET_ORDER_NUMBER;
}
export interface IGET_ORDER_NUMBER_SUCCESS {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly orderNumber: number;
}
export interface IGET_ORDER_NUMBER_ERROR {
    readonly type: typeof GET_ORDER_NUMBER_ERROR;
}
export interface IINCREASE_INGREDIENT {
    readonly type: typeof INCREASE_INGREDIENT;
    readonly id: string;
}
export interface IDECREASE_INGREDIENT {
    readonly type: typeof DECREASE_INGREDIENT;
    readonly id: string;
}
export interface ICLEAR_QUANTITY {
    readonly type: typeof CLEAR_QUANTITY;
}
export interface ICLEAR_ORDER_NUMBER {
    readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TIngredientActions =
    | IGET_INGREDIENT
    | IGET_INGREDIENT_SUCCESS
    | IGET_INGREDIENT_ERROR
    | IGET_ORDER_NUMBER
    | IGET_ORDER_NUMBER_SUCCESS
    | IGET_ORDER_NUMBER_ERROR
    | IINCREASE_INGREDIENT
    | IDECREASE_INGREDIENT
    | ICLEAR_QUANTITY
    | ICLEAR_ORDER_NUMBER;

export function getIngredient(): AppThunkAction {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT,
    });
    request('ingredients')
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_INGREDIENT_SUCCESS,
            ingredient: data.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENT_ERROR,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENT_ERROR,
        });
      });
  };
}

export function getOrder(ingredients: ReadonlyArray<IIngredient>, bun: IIngredient): AppThunkAction {
  return function (dispatch) {
    const ingredientId = [];

    ingredients.map((item: IIngredient) => ingredientId.push(item._id));

    ingredientId.push(bun._id, bun._id);

    dispatch({
      type: GET_ORDER_NUMBER,
    });
    request('orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        // eslint-disable-next-line quote-props
        'ingredients': ingredientId,
      }),
    })
      .then((data) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number,
        });
        ingredientId.length = 0;
        dispatch({
          type: CLEAR_COSTRUCTOR,
        });
        dispatch({
          type: CLEAR_QUANTITY,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_NUMBER_ERROR,
        });
        dispatch({
          type: OPER_ERROR_ORDER,
        });
        dispatch({
          type: CLOSE_ORDER,
        });
      });
  };
}
