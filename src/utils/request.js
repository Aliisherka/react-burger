export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export function request(url, options) {
    return fetch(`${BASE_URL}/${url}`, options).then(checkResponse)
  }