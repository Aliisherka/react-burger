import styles from './OrderDetails.module.css'

import done from '../../images/graphics.svg'

export const OrderDetails = () => {
    return (
        <>
            <p className={styles.numbers + ' text text_type_digits-large'}>034536</p>
            <p className={'text text_type_main-medium'}>идентификатор заказа</p>
            <button className={styles.button} type='button'><img src={done}/></button>
            <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
            <p className={styles.textInactive + ' text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>
        </>

    )
}