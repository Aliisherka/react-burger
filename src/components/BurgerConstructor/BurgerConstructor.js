import styles from './BurgerConstructor.module.css';
import {useState, useContext, useEffect} from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ConstructorContext } from '../../services/constructorContext';
import { getOrderNumber } from '../../utils/order-api';

function BurgerConstructor() {
    const data = useContext(ConstructorContext);

    const [state, setState] = useState({
        visible: false,
        hasError: false,
        total: null,
        orderNumber: null
    })

    useEffect(() => {
        getTotalPrice();
    }, [data]);
    
    function getTotalPrice() {
        const price = [];
        data.map((item) => {
            price.push(item.price);
        });
        
        const total = price.reduce((prev, item) => {
            return prev + item;
        }, 0);
        setState({ ...state, total: total})
    };

    const handleOpenModal = () => {
        setState({ ...state, visible: true});

        getOrderNumber(data, state, setState);
    }

    const handleCloseModal = () => {
        setState({ ...state, visible: false})
    }

    const bun = data.find((bun) => {
        return bun.type === 'bun';
    })

    return (
        <>
            <div className={' pt-25 pl-4 pr-4 pb-10'}>
                <div className={styles.burgerComponent + ' mb-10'}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-8'
                    />
                    <div className={styles.ingredients}>
                        {data.map((ingredient) => {
                            if (ingredient.type !== 'bun') {
                                return (
                                <div className={styles.ingredient} key={ingredient._id}>
                                    <DragIcon type="primary" /> 
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                    />
                                </div>)
                        }})}
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' низ'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-8'
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.price}>
                        <p className='text text_type_digits-medium'>{state.total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            <div>
                {state.visible && state.orderNumber 
                && <Modal handleCloseModal={handleCloseModal}>
                        <OrderDetails orderNumber={state.orderNumber}/>
                    </Modal>}
            </div>
        </>
    )
}

export default BurgerConstructor;