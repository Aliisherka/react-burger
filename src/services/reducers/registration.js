import { 
    REGIST, 
    REGIST_SUCCESS,
    REGIST_ERROR,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOADING_USER
} from "../actions/registration";

const initialState = {
    registRequest: false,
    registError: false,

    loginRequest: false,
    loginError: false,

    logoutRequest: false,
    logoutError: false,

    loggedIn: false,

    getUserRequest: false,
    getUserError: false,

    user: null,
    isUserLoaded: false
}

export const registReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGIST: {
            return {
                ...state,
                registRequest: true,
                registError: false
            }
        }
        case REGIST_SUCCESS: {
            return {
                ...state,
                registRequest: false,
                user: action.user
            }
        }
        case REGIST_ERROR: {
            return {
                ...state,
                registError: false
            }
        }
        case LOGIN: {
            return {
                ...state,
                loginRequest: true,
                loginError: false,
                loggedIn: false
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginError: false,
                loggedIn: true,
                user: action.user
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: true,
                loggedIn: false
            }
        }
        case LOGOUT: {
            return {
                ...state,
                logotRequest: true,
                logotError: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loggedIn: false,
                isUserLoaded: false,
                user: null
            }
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutError: true
            }
        }
        case GET_USER: {
            return {
                ...state,
                getUserRequest: true,
                getUserError: false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                user: action.user
            }
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                getUserError: false
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                getUserRequest: true,
                getUserError: false
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                user: action.user
            }
        }
        case UPDATE_USER_ERROR: {
            return {
                ...state,
                getUserError: false
            }
        }
        case LOADING_USER: {
            return {
                ...state,
                isUserLoaded: true
            }
        }
        default: {
            return state
        }
    }
}