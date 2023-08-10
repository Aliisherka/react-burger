export function getIngredients(URL, state, setState) {
    return fetch(URL)
    .then(res => {
      if (res.ok) {
        setState({...state, isLoading: true})
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)})
    .then(data => setState({ ...state, data: data.data, success: data.success, isLoading: false}))
    .catch(error => {
      setState({...state, isLoading: false, hasError: true})
    })
 }