import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../propTypes/data';
import {useState, useEffect} from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor({data}) {
    const [state, setState] = useState({
        visible: false
    })

    const handleOpenModal = () => {
        setState({visible: true})
    }

    const handleCloseModal = () => {
        setState({visible: false})
    }

    const closeByEsc = (e) => {
        if(e.key === 'Escape') {
            handleCloseModal()
        }
    }

    const bun = data.find((bun) => {
        return bun.type === 'bun';
    })

    useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
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
                        <p className='text text_type_digits-medium'>100</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            <div style={{overflow: 'hidden'}}>
                {state.visible && <OrderDetails handleCloseModal={handleCloseModal} closeByEsc={closeByEsc}/>}
            </div>
        </>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;