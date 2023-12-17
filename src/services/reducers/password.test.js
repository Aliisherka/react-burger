import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RETURN_BACK } from "../actions/password"
import { initialState, passwordReducer } from "./password"


describe('password reducer', () => {
    it('forgot password request after situation without Error', () => {
        const action = {
            type: FORGOT_PASSWORD
        }

        expect(passwordReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    })

    it('forgot password request after Error', () => {
        const initialStateWithError = {
            forgotPasswordRequest: false,
            forgotPasswordError: true,
            forgotSuccess: false,

            resetPasswordRequest: false,
            resetPasswordError: false,
            resetSuccess: false
        }

        const action = {
            type: FORGOT_PASSWORD
        }

        expect(passwordReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            forgotPasswordRequest: true,
            forgotPasswordError: false
        })
    })

    it('forgot password request success', () => {
        const initialStateSuccess = {
            forgotPasswordRequest: true,
            forgotPasswordError: false,
            forgotSuccess: false,
        
            resetPasswordRequest: false,
            resetPasswordError: false,
            resetSuccess: false
        }

        const action = {
            type: FORGOT_PASSWORD_SUCCESS,
            success: true
        }

        expect(passwordReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            forgotPasswordRequest: false,
            forgotSuccess: true
        })
    })

    it('reset password request after situation without Error', () => {
        const action = {
            type: RESET_PASSWORD
        }

        expect(passwordReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: true
        })
    })

    it('reset password request after Error', () => {
        const initialStateWithError = {
            forgotPasswordRequest: false,
            forgotPasswordError: false,
            forgotSuccess: false,

            resetPasswordRequest: false,
            resetPasswordError: true,
            resetSuccess: false
        }

        const action = {
            type: RESET_PASSWORD
        }

        expect(passwordReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            resetPasswordRequest: true,
            resetPasswordError: false
        })
    })

    it('reset password request success', () => {
        const initialStateSuccess = {
            forgotPasswordRequest: false,
            forgotPasswordError: false,
            forgotSuccess: false,
        
            resetPasswordRequest: true,
            resetPasswordError: false,
            resetSuccess: false
        }

        const action = {
            type: RESET_PASSWORD_SUCCESS,
            resetSuccess: true
        }

        expect(passwordReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            resetPasswordRequest: false,
            resetSuccess: true
        })
    })

    it('return back', () => {
        const initialStateSuccess = {
            forgotPasswordRequest: false,
            forgotPasswordError: false,
            forgotSuccess: true,
        
            resetPasswordRequest: false,
            resetPasswordError: false,
            resetSuccess: false
        }

        const action = {
            type: RETURN_BACK
        }

        expect(passwordReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            forgotSuccess: false
        })
    })
})