/* eslint-disable no-confusing-arrow */
import React, { useEffect } from 'react';
import CardOrder from 'components/card-order/CardOrder';

import { useSelector, useDispatch } from 'services/hooks';
import { IOrder } from 'services/types/data';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from 'services/actions/wsAction';

import { WS_BASE_URL } from 'utils/request';

import styles from './Feed.module.css';

function FeedPage() {
  const { messages } = useSelector((store) => store.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_BASE_URL}/all` });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const doneOrders: number[] = [];
  const prepareOrders: number[] = [];

  messages && messages.orders.map((orders: IOrder) => orders.status === 'done'
    ? doneOrders.push(orders.number)
    : orders.status === 'inWork' && prepareOrders.push(orders.number));

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.feed}>
        <div className={`${styles.order} pl-2 pb-10`}>
          {messages
            && messages.orders.map((orders: IOrder) => (
              <CardOrder orders={orders} key={orders._id} link={'feed'} />
            ))}
        </div>
        <div className={styles.stats}>
          <div className={styles.ordersBoard}>
            <div className={styles.board}>
              <h2 className='text text_type_main-medium pb-6'>Готовы:</h2>
              <nav>
                <ul className={styles.list}>
                  {doneOrders.map((number: number, index: number) => (
                    <li
                      key={index}
                      className={`${styles.orderNumber} text text_type_digits-default`}
                    >
                      {number}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className={styles.board}>
              <h2 className='text text_type_main-medium pb-6'>В работе:</h2>
              <nav>
                <ul className={styles.list}>
                  {prepareOrders.map((number: number, index: number) => (
                    <li key={index} className='text text_type_digits-default'>
                      {number}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div>
            <h2 className='text text_type_main-medium'>
              Выполнено за все время:
            </h2>
            <p
              className={`${styles.completedNumber} text text_type_digits-large`}
            >
              {messages && messages.total}
            </p>
          </div>
          <div>
            <h2 className='text text_type_main-medium'>
              Выполнено за сегодня:
            </h2>
            <p
              className={`${styles.completedNumber} text text_type_digits-large`}
            >
              {messages && messages.totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
