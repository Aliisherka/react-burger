import styles from './OrderDetails.module.css'
import PropTypes from 'prop-types';

import done from '../../images/graphics.svg'

export const OrderDetails = (props) => {
    console.log(props.order)
    return (
        <>
            <p className={styles.numbers + ' text text_type_digits-large'}>{props.order}</p>
            <p className={'text text_type_main-medium'}>идентификатор заказа</p>
            <button className={styles.button} type='button'><img src={done}/></button>
            <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
            <p className={styles.textInactive + ' text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>
        </>

    )
}

OrderDetails.propTypes = {
    order: PropTypes.number.isRequired
}