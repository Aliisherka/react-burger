import { 
    OPEN_ORDER,
    CLOSE_ORDER
} from "../actions/modal";

const initialState = {
    visibleOrder: false,
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type) {
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