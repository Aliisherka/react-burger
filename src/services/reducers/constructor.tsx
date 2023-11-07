import { IIngredient } from "../types/data";
import { 
    DRAGGE_INGREDIENT,
    DRAGGE_BUN,
    GIVE_UNIQUE_ID,
    DELETE_INGREDIENT,
    GET_TOTAL_PRICE,
    CLEAR_COSTRUCTOR,
    REORDER_CONSTRUCTOR,
    INCREASE_BUN,
    ADD_INGRIDIENT,
    TConstructorActions
} from "../actions/constructor";

type TConstructorState = {
    draggedBun?: IIngredient;
    totalPrice: number;
    draggedIngredient: Array<IIngredient>;
}

const initialState: TConstructorState = {
    draggedBun: undefined,
    totalPrice: 0,
    draggedIngredient: [],
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch(action.type) {
        case DRAGGE_INGREDIENT: {
            return {
                ...state,
                draggedIngredient: state.draggedIngredient ? [...state.draggedIngredient, ...action.ingredient.filter((ingredient: IIngredient) => ingredient._id === action._id)] : [...action.ingredient.filter((ingredient: IIngredient) => ingredient._id === action._id)]
            }
        }
        case DRAGGE_BUN: {
            return {
                ...state,
                draggedBun: action.ingredient.find((ingredient: IIngredient) => {return ingredient._id === action._id})
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
                draggedIngredient: [...state.draggedIngredient].filter(ingredient => ingredient.uniqueId !== action.uniqueId)
            }
        }
        case GET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.price
            }
        }
        case CLEAR_COSTRUCTOR: {
            return {
                draggedBun: undefined,
                totalPrice: 0,
                draggedIngredient: []
            }
        }
        case REORDER_CONSTRUCTOR: {
            return {
                ...state,
                ...state.draggedIngredient.splice(action.order, 1),
                ...state.draggedIngredient.splice(action.index, 0, action.item),
            }
        }
        case INCREASE_BUN: {
            return {
                ...state,
                draggedBun: state.draggedBun && {...state.draggedBun, __v: 1}
            }
        }
        case ADD_INGRIDIENT: {
            return {
                ...state,
                draggedIngredient: state.draggedIngredient ? [...state.draggedIngredient, action.payload] : [action.payload]
            }
        }
        default: {
            return state
        }
    }
}