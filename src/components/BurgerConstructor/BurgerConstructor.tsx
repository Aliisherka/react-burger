import styles from './BurgerConstructor.module.css';
import {useEffect, useMemo} from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getOrder, INCREASE_INGREDIENT, DECREASE_INGREDIENT, CLEAR_QUANTITY } from '../../services/actions/ingredient';
import { GET_TOTAL_PRICE, DELETE_INGREDIENT, DRAGGE_BUN, CLEAR_COSTRUCTOR, INCREASE_BUN, addIngridient } from '../../services/actions/constructor';
import { CLOSE_ORDER, OPEN_ORDER } from '../../services/actions/modal';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';

import Constructor from '../Constructor/Constructor';
import { IConstructorIngredient, IIngredient } from '../../utils/types';

function BurgerConstructor() {
    const { orderNumber, ingredient } = useSelector((state: any) => state.ingredient);
    const {  draggedBun, totalPrice, draggedIngredient } = useSelector((state: any) => state.constructor);
    const { visibleOrder } = useSelector((state: any) => state.modal);
    const { user } = useSelector((state: any) => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const price = useMemo<number>(() => {
        return (
            (draggedBun ? draggedBun.price * 2 : 0) + (draggedIngredient ? draggedIngredient.reduce((s: number, v: IIngredient) => s + v.price, 0) : 0)
        );
    }, [draggedBun, draggedIngredient]);

    useEffect(() => {
        dispatch({type: GET_TOTAL_PRICE, price})
    }, [dispatch, price]);    

    const handleOpenModal = (): void => {
        if (!user) {
            return navigate('/login')
        }
        if (draggedIngredient  && draggedBun) {
            dispatch({type: OPEN_ORDER});
    
            getOrder(draggedIngredient, draggedBun)(dispatch);
    
            dispatch({
                type: CLEAR_COSTRUCTOR
            })
            dispatch({
                type: CLEAR_QUANTITY
            })
        }
    }

    const handleCloseModal = (): void => {
        dispatch({type: CLOSE_ORDER});
    }

    const [, drop] = useDrop<any>({
        accept: 'ingredient',
        drop({_id, type, item}) {
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
                dispatch(addIngridient(item))
                dispatch({
                    type: INCREASE_INGREDIENT,
                    _id: _id
                })
            }
        }
    })

    const deleteIngredient = (id: string, uniqueId: string): void => {
        dispatch({
            type: DELETE_INGREDIENT,
            uniqueId
        })
        dispatch({
            type: DECREASE_INGREDIENT,
            id
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
                        {draggedIngredient.map((ingredient: IIngredient & IConstructorIngredient, index: number) => {
                            if (ingredient.type !== 'bun') {
                                return (
                                    <Constructor 
                                        text ={ingredient.name}
                                        item={ingredient}
                                        handleClose={() => deleteIngredient(ingredient._id, ingredient.uniqueId)}
                                        key={ingredient.uniqueId}
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
                {(visibleOrder && orderNumber)
                && <Modal handleCloseModal={handleCloseModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>}
            </div>
        </>
    )
}

export default BurgerConstructor;