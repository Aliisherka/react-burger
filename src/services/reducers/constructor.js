import { 
    DRAGGE_INGREDIENT,
    DRAGGE_BUN,
    GIVE_UNIQUE_ID,
    DELETE_INGREDIENT,
    GET_TOTAL_PRICE,
    CLEAR_COSTRUCTOR,
    REORDER_CONSTRUCTOR,
    INCREASE_BUN
} from "../actions/constructor";

const initialState = {
    draggedBun: [],
    totalPrice: null,
    draggedIngredient: [],
}

export const constructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case DRAGGE_INGREDIENT: {
            return {
                ...state,
                draggedIngredient: state.draggedIngredient ? [...state.draggedIngredient, ...action.ingredient.filter(ingredient => ingredient._id === action._id)] : [...action.ingredient.filter(ingredient => ingredient._id === action._id)]
            }
        }
        case DRAGGE_BUN: {
            return {
                ...state,
                draggedBun: [...action.ingredient.filter(ingredient => ingredient._id === action._id)]
            }
        }
        case GIVE_UNIQUE_ID: {
            return {
                ...state,
                draggedIngredient: [...state.draggedIngredient].map(item => item._id === action._id ? {...item, _id: action.uniqueId, prevId: action._id, index: action.index} : item)
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                draggedIngredient: [...state.draggedIngredient].filter(ingredient => ingredient._id !== action.id)
            }
        }
        case GET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.total
            }
        }
        case CLEAR_COSTRUCTOR: {
            return {
                ...state,
                draggedBun: [],
                draggedIngredient: [],
                //ingredient: [...state.ingredient].map(item => item.__v > null ? {...item, __v: null} : item)
            }
        }
        case REORDER_CONSTRUCTOR: {
            return {
                ...state,
                ...state.draggedIngredient.splice(action.order, 1),
                ...state.draggedIngredient.splice(action.index, 0, action.item)
            }
        }
        case INCREASE_BUN: {
            return {
                ...state,
                draggedBun: [...state.draggedBun].map(item => item._id === action._id ? { ...item, __v: 1} : item)
            }
        }
        default: {
            return state
        }
    }
}