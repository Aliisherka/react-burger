import { GET_USER, GET_USER_SUCCESS, LOADING_USER, LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, REGIST, REGIST_SUCCESS, UPDATE_USER, UPDATE_USER_SUCCESS } from "../actions/registration"
import { initialState, registReducer } from "./registration"


describe('registration reducer', () => {
    const user = {
        name: 'abc',
        email: 'abc@mail.ru'
    }

    it('registration request after situation without Error', () => {
        const action = {
            type: REGIST
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            registRequest: true
        })
    })

    it('registration request after Error', () => {
        const initialStateWithError = {
            registRequest: false,
            registError: true,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: REGIST
        }

        expect(registReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            registRequest: true,
            registError: false
        })
    })

    it('registration request success', () => {
        const initialStateSuccess = {
            registRequest: true,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: REGIST_SUCCESS,
            user: user
        }

        expect(registReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            registRequest: false,
            user: user
        })
    })

    it('login request after situation without Error', () => {
        const action = {
            type: LOGIN
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: true
        })
    })

    it('login request after Error', () => {
        const initialStateWithError = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: true,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: LOGIN
        }

        expect(registReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loginRequest: true,
            loginError: false
        })
    })

    it('login request success', () => {
        const initialStateSuccess = {
            registRequest: false,
            registError: false,
        
            loginRequest: true,
            loginError: false,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: LOGIN_SUCCESS,
            user: user
        }

        expect(registReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            loginRequest: false,
            loggedIn: true,
            user: user
        })
    })

    it('logout request after situation without Error', () => {
        const action = {
            type: LOGOUT
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: true
        })
    })

    it('logout request after Error', () => {
        const initialStateWithError = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: false,
            logoutError: true,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: LOGOUT
        }

        expect(registReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            logoutRequest: true,
            logoutError: false
        })
    })

    it('logout request success', () => {
        const initialStateSuccess = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: true,
            logoutError: false,
        
            loggedIn: true,
        
            getUserRequest: false,
            getUserError: false,
        
            user: user,
            isUserLoaded: false
        }

        const action = {
            type: LOGOUT_SUCCESS
        }

        expect(registReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            loggedIn: false,
            user: undefined,
        })
    })

    it('get user request after situation without Error', () => {
        const action = {
            type: GET_USER
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            getUserRequest: true
        })
    })

    it('get user request after Error', () => {
        const initialStateWithError = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: true,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: GET_USER
        }

        expect(registReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            getUserRequest: true,
            getUserError: false
        })
    })

    it('get user request success', () => {
        const initialStateSuccess = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: true,
            logoutError: false,
        
            loggedIn: true,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: GET_USER_SUCCESS, 
            user: user
        }

        expect(registReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            getUserRequest: false,
            user: user
        })
    })

    it('update user request after situation without Error', () => {
        const action = {
            type: UPDATE_USER
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            getUserRequest: true
        })
    })

    it('update user request after Error', () => {
        const initialStateWithError = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: false,
            logoutError: false,
        
            loggedIn: false,
        
            getUserRequest: false,
            getUserError: true,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: UPDATE_USER
        }

        expect(registReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            getUserRequest: true,
            getUserError: false
        })
    })

    it('update user request success', () => {
        const initialStateSuccess = {
            registRequest: false,
            registError: false,
        
            loginRequest: false,
            loginError: false,
        
            logoutRequest: true,
            logoutError: false,
        
            loggedIn: true,
        
            getUserRequest: false,
            getUserError: false,
        
            user: undefined,
            isUserLoaded: false
        }

        const action = {
            type: UPDATE_USER_SUCCESS, 
            user: user
        }

        expect(registReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            getUserRequest: false,
            user: user
        })
    })

    it('loading user', () => {
        const action = {
            type: LOADING_USER
        }

        expect(registReducer(initialState, action)).toEqual({
            ...initialState,
            isUserLoaded: true
        })
    })
})