import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { request, checkResponse, BASE_URL } from '../../utils/request';

export const REGIST = 'REGIST';
export const REGIST_SUCCESS = 'REGIST_SUCCESS';
export const REGIST_ERROR = 'REGIST_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const LOADING_USER = 'LOADING_USER';

export function regist(form) {
    return function(dispatch) {
        dispatch({type: REGIST})
        request('auth/register', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        })
        .then(data => {
            localStorage.removeItem('accessToken');
            deleteCookie('refreshToken');
            localStorage.setItem('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            dispatch({
                type: REGIST_SUCCESS,
                user: data.user
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: REGIST_ERROR
            })
        })
    }
}

export function login(form) {
    return function(dispatch) {
        dispatch({type: LOGIN})
        request('auth/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        })
        .then(data => {
            localStorage.removeItem('accessToken');
            deleteCookie('refreshToken');
            localStorage.setItem('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken)
            console.log(getCookie('refreshToken'))
            dispatch({
                type: LOGIN_SUCCESS,
                user: data.user
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR
            })
        })
    }
}

export function refreshToken() {
    return request('auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        })
}

export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        setCookie("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

export function logout() {
    return function(dispatch) {
        dispatch({type: LOGOUT})
        request('auth/logout', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        })
        .then(data => {
            deleteCookie('refreshToken');
            localStorage.removeItem('accessToken');
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        })
        .catch(err => {
            dispatch({
                type: LOGOUT_ERROR
            })
        })
    }
}

export function getUser() {
    return function(dispatch) {
        dispatch({type: GET_USER})
        fetchWithRefresh(`${BASE_URL}/auth/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: localStorage.getItem('accessToken')
            }
        })
        .then(data => {
            dispatch({
                type: GET_USER_SUCCESS,
                user: data.user
            })
        })
        .catch(err => {
            dispatch({
                type: GET_USER_ERROR
            })
        })
    }
}

export function updateUser(form) {
    return function(dispatch) {
        dispatch({type: UPDATE_USER})
        fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        })
        .then(data => {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                user: data.user
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: UPDATE_USER_ERROR
            })
        })
    }
}