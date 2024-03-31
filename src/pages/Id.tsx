/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'services/hooks';
import { IIngredient, IOrder } from 'services/types/data';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from 'services/actions/wsAction';

import { WS_BASE_URL } from 'utils/request';

import styles from './Id.module.css';

enum OrderType {
  DONE = 'Выполнен',
  INWORK = 'Готовится',
  CANCEL = 'Отменен',
  CREATE = 'Создан',
}

interface IIdPageProps {
  owner?: boolean;
}

function IdPage({ owner }: IIdPageProps) {
  const { ingredient } = useSelector((state) => state.ingredient);
  const { ingredientId } = useParams();
  const { messages, ownOrder } = useSelector((store) => store.ws);
  const [current, setCurrent] = useState<OrderType>(OrderType.DONE);
  const accessToken = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  useEffect(() => {
    owner
      ? dispatch({
        type: WS_CONNECTION_START,
        payload: `${WS_BASE_URL}?token=${accessToken && accessToken.split('Bearer ')[1]}`,
      })
      : dispatch({ type: WS_CONNECTION_START, payload: `${WS_BASE_URL}/all` });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [accessToken, dispatch, owner]);

  const ingredientArray: any = [];
  const count: IIngredient[][] = [];
  const price: number[] = [];
  let totalPrice: number = 0;

  const elements: IOrder | undefined = ownOrder && owner
    ? ownOrder.orders.filter((item: IOrder) => item._id === ingredientId)[0]
    : messages
      && messages.orders.filter((item: IOrder) => item._id === ingredientId)[0];

  useEffect(() => {
    if (elements && elements.status === 'done') {
      setCurrent(OrderType.DONE);
    } else if (elements && elements.status === 'inWork') {
      setCurrent(OrderType.INWORK);
    } else if (elements && elements.status === 'cancel') {
      setCurrent(OrderType.CANCEL);
    } else if (elements && elements.status === 'create') {
      setCurrent(OrderType.CREATE);
    }
  }, [elements]);

  if (elements) {
    elements.ingredients.sort().map((element: string) => {
      return ingredientArray.push(
        ingredient.find((ingredient: IIngredient) => ingredient._id === element),
      );
    });

    elements.ingredients.reduce((prev: string, item: string) => {
      if (prev !== item) {
        count.push(
          ingredientArray.filter(
            (ingredient: IIngredient) => ingredient._id === item,
          ),
        );
      }
      return item;
    }, '');

    ingredientArray.map((ingredient: IIngredient) => price.push(ingredient.price));

    totalPrice = price.reduce((s: number, v: number) => s + v, 0);
  }

  return (
    <div className={styles.feedId}>
      {(messages || ownOrder) && elements ? (
        <>
          <h2
            className={`${styles.title} text text_type_digits-default mb-8 mt-2`}
          >
            #{elements.number}
          </h2>
          <>
            <p className={`${styles.name} text text_type_main-medium mb-3`}>
              {elements.name}
            </p>
            <p
              className={
                elements.status === 'done'
                  ? `${styles.done} text text_type_main-default mb-15`
                  : elements.status === 'cancel'
                    ? `${styles.cancel} text text_type_main-default mb-15`
                    : ' text text_type_main-default mb-15'
              }
            >
              {current}
            </p>
          </>
          <>
            <h2 className='text text_type_main-medium mb-6'>Состав:</h2>
            <nav>
              <ul className={styles.list}>
                {count.map((item: any) => (
                  <li className={styles.listItem} key={item[0]._id}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={item[0].image}
                        alt={'images'}
                      />
                    </div>
                    <p className='text text_type_main-default'>
                      {item[0].name}
                    </p>
                    <div className={styles.price}>
                      <p className='text text_type_digits-default'>
                        {item.length} x {item[0].price}
                      </p>
                      <CurrencyIcon type='primary' />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`${styles.timePrice} mt-8 mb-2`}>
              <p className='text text_type_main-default text_color_inactive'>
                {<FormattedDate date={new Date(elements.createdAt)} />}
              </p>
              <div className={styles.price}>
                <p className='text text_type_digits-default'>{totalPrice}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default IdPage;
