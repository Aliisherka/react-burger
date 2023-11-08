import styles from './Feed.module.css';
import { useSelector, useDispatch } from '../services/hooks';
import CardOrder from '../components/CardOrder/CardOrder';
import { IOrder } from '../services/types/data';
import {useEffect} from 'react';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/wsAction';

export function FeedPage () {
    const {messages} = useSelector(store => store.ws);
    const dispatch = useDispatch();
    //console.log(messages)

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [dispatch]);
    
    let doneOrders: number[] = [];
    let prepareOrders: number[] = [];

    messages && messages.orders.map((orders: IOrder) => {
        return orders.status === 'done' ? doneOrders.push(orders.number) 
            : orders.status === 'inWork' && prepareOrders.push(orders.number)
    })
    
    return (
        <>
            <h2 className={styles.title + ' text text_type_main-large'}>Лента заказов</h2>
            <div className={styles.feed}>
                <div className={styles.order + ' pl-2 pb-10'}>
                    {messages && messages.orders.map((orders: IOrder) => {
                        return <CardOrder orders={orders} key={orders._id} link={'feed'}/>
                    })}
                </div>
                <div className={styles.stats}>
                    <div className={styles.ordersBoard}>
                        <div className={styles.board}>
                            <h2 className='text text_type_main-medium pb-6'>Готовы:</h2>
                            <nav>
                                <ul className={styles.list}>
                                    {doneOrders.map((number: number, index: number) => {
                                        return <li key={index} className={styles.orderNumber + ' text text_type_digits-default'}>{number}</li>
                                    })}
                                </ul>
                            </nav>
                        </div>
                        <div className={styles.board}>
                            <h2 className='text text_type_main-medium pb-6'>В работе:</h2>
                            <nav>
                                <ul className={styles.list}>
                                    {prepareOrders.map((number: number, index: number) => {
                                        return <li key={index} className='text text_type_digits-default'>{number}</li>
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div>
                        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                        <p className={styles.completedNumber + ' text text_type_digits-large'}>{messages && messages.total}</p>
                    </div>
                    <div>
                        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                        <p className={styles.completedNumber + ' text text_type_digits-large'}>{messages && messages.totalToday}</p>
                    </div>
                </div>
            </div>
        </>
    )
}