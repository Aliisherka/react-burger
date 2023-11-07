export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err))
}

export function request(url: string, options?: RequestInit) {
    return fetch(`${BASE_URL}/${url}`, options).then(checkResponse)
  }