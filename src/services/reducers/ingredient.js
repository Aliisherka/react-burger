import { 
    GET_INGREDIENT,
    GET_INGREDIENT_SUCCESS,
    GET_INGREDIENT_ERROR,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_ERROR,
    INCREASE_INGREDIENT,
    DECREASE_INGREDIENT,
} from "../actions/ingredient";

const initialState = {
    ingredientRequest: false,
    ingredientFailed: false,
    ingredient: [],

    orderNumberRequest: false,
    orderNumberFailed: false,
    orderNumber: null,

    draggedIngredient: []
}

export const ingredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENT: {
            return {
                ...state,
                ingredientRequest: true,
                ingredientFailed: false
            }
        }
        case GET_INGREDIENT_SUCCESS: {
            return {
                ...state,
                ingredient: action.ingredient,
                ingredientRequest: false
            }
        }
        case GET_INGREDIENT_ERROR: {
            return {
                ...state,
                ingredientRequest: false,
                ingredientFailed: true
            }
        }
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                orderNumberRequest: true,
                orderNumberFailed: false
            }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderNumberRequest: false
            }
        }
        case GET_ORDER_NUMBER_ERROR: {
            return {
                ...state,
                orderNumberRequest: false,
                orderNumberFailed: true,
                orderNumber: []
            }
        }
        case INCREASE_INGREDIENT: {
            return {
                ...state,
                ingredient: [...state.ingredient].map(item => item._id === action._id ? { ...item, __v: ++item.__v} : item)
            }
        }
        case DECREASE_INGREDIENT: {
            return {
                ...state,
                ingredient: [...state.ingredient].map(item => item._id === action.prevId ? { ...item, __v: --item.__v} : item),
            }
        }
        default: {
            return state
        }
    }
}
