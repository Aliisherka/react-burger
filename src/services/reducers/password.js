import {
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RETURN_BACK
} from '../actions/password';

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordError: false,
    forgotSuccess: false,

    resetPasswordRequest: false,
    resetPasswordError: false,
    resetSuccess: false
}

export const passwordReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordError: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotSuccess: action.success,
                resetSuccess: false
            }
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordError: true,
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordError: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetSuccess: action.resetSuccess,
                forgotSuccess: false
            }
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: true,
                forgotSuccess: false
            }
        }
        case RETURN_BACK: {
            return {
                ...state,
                forgotSuccess: false
            }
        }
        default: {
            return state
        }
    }
}