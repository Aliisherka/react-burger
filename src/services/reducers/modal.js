import { 
    OPEN_ELEMENT,
    CLOSE_ELEMENT,
    OPEN_ORDER,
    CLOSE_ORDER
} from "../actions/modal";

const initialState = {
    visibleOrder: false,

    visibleElement: false,
    element: []
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_ELEMENT: {
            return {
                ...state,
                visibleElement: true,
                element: action.ingredient.filter(item => item._id === action.e.currentTarget.id)[0]
            }
        }
        case CLOSE_ELEMENT: {
            return {
                ...state,
                visibleElement: false,
                element: []
            }
        }
        case OPEN_ORDER: {
            return {
                ...state,
                visibleOrder: true
            }
        }
        case CLOSE_ORDER: {
            return {
                ...state,
                visibleOrder: false
            }
        }
        default: {
            return state
        }
    }
}