export const getOrderNumber = (data, state, setState) => {
    const ingredientId = [];
    data.map((item) => {
        ingredientId.push(item._id);
    });
    fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": ingredientId
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`)})
    .then((data) => {
        setState({ ...state, orderNumber: data.order.number, visible: true});
    }); 
}