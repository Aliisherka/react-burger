import { request } from '../../utils/request';

export const GET_INGREDIENT = 'GET_INGREDIENT';
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_ERROR = 'GET_INGREDIENT_ERROR';

export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export function getIngredient() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENT
        })
        request('ingredients')
        .then(data => {
            if (data.success) {
                dispatch({
                    type: GET_INGREDIENT_SUCCESS,
                    ingredient: data.data
                })
            } else {
                dispatch({
                    type: GET_INGREDIENT_ERROR
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_INGREDIENT_ERROR
            })
        })
    }
}

export function getOrder(ingredient, bun) {
    const ingredientId = [];

    ingredient.map((item) => {
        ingredientId.push(item.prevId);
    });

    bun.map((item) => {
        ingredientId.push(item._id);
    });
    
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER
        })
        request('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ingredients": ingredientId
            })
        })
        .then(data => {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                orderNumber: data.order.number
            })
            ingredientId.length = 0;
        })
        .catch(err => {
            dispatch({
                type: GET_ORDER_NUMBER_ERROR
            })
        })
    }
}