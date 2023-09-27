export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res: any) {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err))
}

export function request(url: string, options: any) {
    return fetch(`${BASE_URL}/${url}`, options).then(checkResponse)
  }