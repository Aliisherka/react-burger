import styles from './Id.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { useEffect, useState } from 'react';
import { IIngredient } from '../services/types/data';
import { WS_CONNECTION_START } from '../services/actions/wsAction';

enum OrderType {
    DONE = 'Выполнен',
    INWORK = 'Готовится',
    CANCEL = 'Отменен',
    CREATE = 'Создан'
}

interface IIdPageProps {
    owner? :boolean
}

export function IdPage({owner}: IIdPageProps) {
    const { ingredientId } = useParams();
    const {messages, ownOrder} = useSelector(store => store.ws);
    const { ingredient } = useSelector((state) => state.ingredient);
    const [current, setCurrent] = useState<OrderType>(OrderType.DONE);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [dispatch])

    let elements: any;
    let ingredientArray: any = [];
    let count: IIngredient[][] = [];
    
    owner && ownOrder ? elements = ownOrder.orders.filter((item: any)=> item._id === ingredientId)[0]
        : messages ? elements = messages.orders.filter((item: any)=> item._id === ingredientId)[0]
        : elements = undefined
    
    useEffect(() => {
        if (elements.status === 'done') {
            setCurrent(OrderType.DONE);
        } else if(elements.status === 'inWork') {
            setCurrent(OrderType.INWORK);
        } else if(elements.status === 'cancel') {
            setCurrent(OrderType.CANCEL);
        } else if (elements.status === 'create') {
            setCurrent(OrderType.CREATE);
        }
    }, [elements])
        
    elements.ingredients.sort().map((element: any) => {
        return ingredientArray.push(ingredient.find((ingredient: IIngredient) => ingredient._id === element))
    })
    
    elements.ingredients.reduce((prev: string, item: string) => {
        if (prev !== item) {
            count.push(ingredientArray.filter((ingredient: IIngredient) => ingredient._id === item))
        }
        return item
    }, '');

    let price: number[] = []

    ingredientArray.map((ingredient: IIngredient) => {
        return price.push(ingredient.price); 
    })
    const totalPrice = price.reduce((s: number, v: number) => { return s + v }, 0);

    return (
        <div className={styles.feedId}>
            {(messages || ownOrder) &&
            <>
                <h2 className={styles.title + ' text text_type_digits-default mb-8 mt-2'}>#{elements.number}</h2>
                <>
                    <p className={styles.name + ' text text_type_main-medium mb-3'}>{elements.name}</p>
                    <p className={
                        elements.status === 'done' 
                            ? styles.done + ' text text_type_main-default mb-15'
                            : elements.status === 'cancel'
                            ? styles.cancel + ' text text_type_main-default mb-15'
                            : ' text text_type_main-default mb-15'
                    }>{current}</p>
                </>
                <>
                    <h2 className='text text_type_main-medium mb-6'>Состав:</h2>
                    <nav>
                        <ul className={styles.list}>
                            {count.map((item: any) => {
                                return <li className={styles.listItem} key={item[0]._id}>
                                    <div className={styles.imageContainer}>
                                        <img className={styles.image} src={item[0].image} alt={'images'}/>
                                    </div>
                                    <p className='text text_type_main-default'>{item[0].name}</p>
                                    <div className={styles.price}>
                                        <p className='text text_type_digits-default'>{item.length} x {item[0].price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            })}
                        </ul>
                    </nav>
                    <div className={styles.timePrice + ' mt-8 mb-2'}>
                        <p className='text text_type_main-default text_color_inactive'>{<FormattedDate date={new Date(elements.createdAt)} />}</p>
                        <div className={styles.price}>
                            <p className='text text_type_digits-default'>{totalPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>
            </>
            }
        </div>
    )
}