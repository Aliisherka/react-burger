import { 
    OPEN_ORDER,
    CLOSE_ORDER,
    TModalActions
} from "../actions/modal";

type TModalState = {
    visibleOrder: boolean
}

const initialState: TModalState = {
    visibleOrder: false,
}

export const modalReducer = (state = initialState, action: TModalActions) => {
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