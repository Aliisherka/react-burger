import styles from './BurgerConstructor.module.css';
import {useEffect, useMemo} from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getOrder, INCREASE_INGREDIENT, DECREASE_INGREDIENT, CLEAR_QUANTITY } from '../../services/actions/ingredient';
import { GET_TOTAL_PRICE, DELETE_INGREDIENT, DRAGGE_BUN, CLEAR_COSTRUCTOR, INCREASE_BUN, DRAGGE_INGREDIENT } from '../../services/actions/constructor';
import { CLOSE_ORDER, OPEN_ORDER } from '../../services/actions/modal';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { useNavigate, Navigate } from 'react-router-dom';

import Constructor from '../Constructor/Constructor';

function BurgerConstructor() {
    const { orderNumber, ingredient } = useSelector(state => state.ingredient);
    const {  draggedBun, totalPrice, draggedIngredient } = useSelector(state => state.constructor);
    const { visibleOrder } = useSelector(state => state.modal);
    const { user } = useSelector(state => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const price = useMemo(() => {
        return (
            (draggedBun ? draggedBun.price * 2 : 0) + (draggedIngredient ? draggedIngredient.reduce((s, v) => s + v.price, 0) : 0)
        );
    }, [draggedBun, draggedIngredient]);

    useEffect(() => {
        dispatch({type: GET_TOTAL_PRICE, price})
    }, [dispatch, price]);
    

    const handleOpenModal = () => {
        if (!user) {
            return navigate('/login')
        }
        (draggedIngredient && draggedBun)  &&
            dispatch({type: OPEN_ORDER});
    
            dispatch(getOrder(draggedIngredient, draggedBun));
    
            dispatch({
                type: CLEAR_COSTRUCTOR
            })
            dispatch({
                type: CLEAR_QUANTITY
            })
    }

    const handleCloseModal = () => {
        dispatch({type: CLOSE_ORDER});
    }

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop({_id, type}) {
            if (type === 'bun') {
                dispatch({
                    type: DRAGGE_BUN,
                    _id: _id,
                    ingredient
                })
                dispatch({
                    type: INCREASE_BUN,
                    _id
                })
            } else {
                dispatch({
                    type: DRAGGE_INGREDIENT,
                    _id: _id,
                    ingredient,
                })
                dispatch({
                    type: INCREASE_INGREDIENT,
                    _id: _id
                })
            }
        }
    })



    const deleteIngredient = (prevId, id) => {
        dispatch({
            type: DELETE_INGREDIENT,
            id
        })
        dispatch({
            type: DECREASE_INGREDIENT,
            prevId
        })
    }

    return (
        <>
            <div className={' pt-25 pl-4 pr-4 pb-10'} ref={drop}>
                <div className={styles.burgerComponent + ' mb-10'}>
                    {draggedBun && 
                        <Constructor 
                            item={draggedBun} 
                            isLocked={true} 
                            extraClass={'ml-8'} 
                            type={'top'} 
                            text={draggedBun.name + ' (верх)'}
                        />
                    }
                    {draggedIngredient &&
                    <div className={styles.ingredients}>
                        {draggedIngredient.map((ingredient, index) => {
                            if (ingredient.type !== 'bun') {
                                return (
                                    <Constructor 
                                        text ={ingredient.name}
                                        item={ingredient}
                                        handleClose={() => deleteIngredient(ingredient.prevId, ingredient._id)}
                                        _id={ingredient._id}
                                        key={index}
                                        index={index}
                                    />
                                )
                            }
                            return ingredient;
                        })}
                    </div>
                    }
                    {draggedBun && 
                        <Constructor 
                            item={draggedBun} 
                            isLocked={true} 
                            extraClass={'ml-8'} 
                            type={'bottom'} 
                            text={draggedBun.name + ' (низ)'}
                        />
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.price}>
                        <p className='text text_type_digits-medium'>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            <div>
                {visibleOrder && orderNumber
                && <Modal handleCloseModal={handleCloseModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>}
            </div>
        </>
    )
}

export default BurgerConstructor;