import React from 'react';
import done from 'images/done.svg';

import style from './OrderDetails.module.css';

interface IOrderProps {
    orderNumber: number
}

function OrderDetails({ orderNumber }: IOrderProps) {
  return (
    <div className={style.order}>
      <p className={`${style.number} text text_type_digits-large pt-4 pb-8`}>
        {orderNumber}
      </p>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      <img className='pb-15' alt='done' src={done} />
      <p className='text text_type_main-default pb-4'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive pb-30'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
