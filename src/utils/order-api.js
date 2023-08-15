import { request } from './request';

export const getOrderNumber = (data, state, setState) => {
    const ingredientId = [];
    data.map((item) => {
        ingredientId.push(item._id);
    });
    request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": ingredientId
        })
    })
    .then((data) => {
        setState({ ...state, orderNumber: data.order.number, visible: true});
    })
    .catch(error => {
        setState({...state, hasError: true})
      })
}