import { getCookie } from '../../utils/cookie';
import { request } from '../../utils/request';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const RETURN_BACK = 'RETURN_BACK';

export function forgotPassword(email) {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD
        })
        request('password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(data => {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                success: data.success
            })
        })
        .catch(err => {
            dispatch({
                type: FORGOT_PASSWORD_ERROR
            })
        })
    }
}

export function resetPassword(form) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD
        })
        request('password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(data => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                resetSuccess: data.success
            })
        })
        .catch(err => {
            dispatch({
                type: RESET_PASSWORD_ERROR
            })
        })
    }
}