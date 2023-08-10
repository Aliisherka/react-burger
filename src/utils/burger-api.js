import { request } from './request';

export function getIngredients(state, setState) {
    return request('ingredients')
    .then(data => setState({ ...state, data: data.data, success: data.success, isLoading: false}))
    .catch(error => {
      setState({...state, isLoading: false, hasError: true})
    })
 }