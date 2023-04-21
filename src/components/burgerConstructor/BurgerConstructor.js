import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css'

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { BurgerContext } from '../../context/burgerContext';

export const BurgerConstructor = () => {
    const [state, setState] = React.useState({
        visible: false
    })

    const [number, setNumber] = React.useState();

    const [orderNumber , setOrderNumber] = React.useState({
        success: false
    });

    const data = React.useContext(BurgerContext);

    React.useEffect(() => {
        const arr = [];

        data.map((item) => {
            arr.push(item.price)
        })

        const total = arr.reduce(function (prev, item) {
            return prev + item;
        })

        setNumber(total)
    }, []);

    const burgerBun = data.find((item) => {
        return item.type.includes("bun");
    })


    const openPopup = () => {
        setState({visible: true});
        orders()
    }

    const closePopup = () => {
        setState({visible: false})
    }    

    const orders = () => {
        const orderId = []
        data.map((item) => {
            orderId.push(item._id)
        })
        console.log(orderId)
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                ingredients: orderId
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setOrderNumber({orderNumber: data.order.number, success: data.success}))
        .catch(e => {
            console.log('ошибка загрузки карточек');
        });
    }

    //console.log(orderNumber)

    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.BurgerComponents}>
                <div className={styles.burgerBun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={burgerBun.name + " (верх)"}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}                           
                    />
                </div>
                <div className={styles.burgerMainSause}>
                    {data.map((item)=>(
                        item.type !== 'bun' &&
                            <div className={styles.burgerSauceItem} key={item._id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                        ))}
                </div>
                <div className={styles.burgerBun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={burgerBun.name + " (низ)"}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}
                    />
                </div>
            </div>  
            <div className={styles.burgerInfo + ' pr-4'}>
                <div className={styles.burgerPrice}>
                    <p className="text text_type_digits-medium">{number}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={openPopup} htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
                {(state.visible && orderNumber.success) &&
                <Modal closePopup={closePopup}>
                    <OrderDetails order={orderNumber.orderNumber}/>
                </Modal>
                }
            </div>
        </section>
    )
}