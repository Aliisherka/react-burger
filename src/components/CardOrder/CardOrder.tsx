import styles from './CardOrder.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IIngredient, IOrder } from '../../services/types/data';

enum OrderType {
    DONE = 'Выполнен',
    INWORK = 'Готовится',
    CANCEL = 'Отменен',
    CREATE = 'Создан'
}

interface ICardOrdersProps {
    link: string,
    status?: boolean,
    orders: IOrder
}

function CardOrder({orders, link, status}: ICardOrdersProps) {
    const location = useLocation();
    const { ingredient } = useSelector((state) => state.ingredient);
    const [current, setCurrent] = useState<OrderType>(OrderType.DONE);

    useEffect(() => {
        if (orders.status === 'done') {
            setCurrent(OrderType.DONE);
        } else if(orders.status === 'inWork') {
            setCurrent(OrderType.INWORK);
        } else if(orders.status === 'cancel') {
            setCurrent(OrderType.CANCEL);
        } else if (orders.status === 'create') {
            setCurrent(OrderType.CREATE);
        }
    }, [orders])

    let ingredientArray: any = [];
    let price: number[] = [];
    orders.ingredients.sort().map((order: string) => {
        return ingredientArray.push(ingredient.find((ingredient: IIngredient) => ingredient._id === order))
    })

    ingredientArray.forEach((ingredient: IIngredient) => {
        price.push(ingredient.price);
    })

    let count: IIngredient[][] = [];
    orders.ingredients.sort().reduce((prev: string, item: string) => {
        if (prev !== item) {
            count.push(ingredientArray.filter((ingredient: IIngredient) => ingredient._id === item))
        }
        return item
    }, '');
            
    const totalPrice = price.reduce((s: number, v: number) => { return s + v }, 0);
    const ingredientId: string = orders._id;

    let imageIndex = 6;

    return (
        <Link key={ingredientId} to={`/${link}/${ingredientId}`} state={{ background: location }} className={styles.link}>
            <div className={styles.cardOrder} key={orders._id}>
                <div className={styles.orderId}>
                    <p className='text text_type_digits-default'>#{orders.number}</p>
                    <p className='text text_type_main-default text_color_inactive'>{<FormattedDate date={new Date(orders.createdAt)} />}</p>
                </div>
                <div>
                    <h2 className='text text_type_main-medium'>{orders.name}</h2>  
                    {status && <p className={
                            orders.status === 'done' 
                                ? styles.done + ' text text_type_main-default mt-2'
                                : orders.status === 'cancel'
                                ? styles.cancel + ' text text_type_main-default mt-2'
                                : ' text text_type_main-default mt-2'
                        }>{current}</p>
                    }                      
                </div>
                <div className={styles.imgAndPrice}>
                    <div className={styles.ingredients}>
                        {count.map((cardOrder: IIngredient[], index: number) => {
                            imageIndex = imageIndex - 1;
                            let number = ingredientArray.length - 6;
                            return imageIndex > 0 
                                ? <div className={styles.imageContainer} key={index} style={{zIndex: imageIndex}}>
                                    <img className={styles.image} src={`${cardOrder[0].image}`} alt={'ingredient'}/>
                                  </div>
                                : imageIndex === 0 && <div className={styles.imageContainer} key={index} style={{zIndex: imageIndex}}>
                                    {number > 0 && 
                                        <>
                                            <p className={styles.number + ' text text_type_main-default'}>+{number}</p>
                                            <div className={styles.overlay}></div>
                                        </>
                                    }
                                    <img className={styles.image} src={`${cardOrder[0].image}`} alt={'ingredient'}/>
                                </div>
                        })}
                    </div>
                    <div className={styles.price}>
                        <p className='text text_type_digits-default'>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardOrder;