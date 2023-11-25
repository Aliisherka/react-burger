import { IUseFormProps } from '../../hooks/useForm';
import { request } from '../../utils/request';
import { AppThunkAction } from '../types';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const RETURN_BACK = 'RETURN_BACK';

export interface IFORGOT_PASSWORD {
    readonly type: typeof FORGOT_PASSWORD;
}

export interface IFORGOT_PASSWORD_SUCCESS {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly success: boolean
}

export interface IFORGOT_PASSWORD_ERROR {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IRESET_PASSWORD {
    readonly type: typeof RESET_PASSWORD;
}

export interface IRESET_PASSWORD_SUCCESS {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly resetSuccess: boolean
}

export interface IRESET_PASSWORD_ERROR {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IRETURN_BACK {
    readonly type: typeof RETURN_BACK;
}

export type TPasswordActions = 
    | IFORGOT_PASSWORD
    | IFORGOT_PASSWORD_SUCCESS
    | IFORGOT_PASSWORD_ERROR
    | IRESET_PASSWORD
    | IRESET_PASSWORD_SUCCESS
    | IRESET_PASSWORD_ERROR
    | IRETURN_BACK;


export function forgotPassword(email: string): AppThunkAction {
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

export function resetPassword(form: IUseFormProps): AppThunkAction {
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