import styles from './OrderDetails.module.css'
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

import done from '../../images/graphics.svg'

export const OrderDetails = (props) => {
    return (
            <div className={styles.popup}>
                <ModalOverlay closePopup={props.closePopup}/>
                <div className={styles.container}>
                    <button onClick={props.closePopup} className={styles.close}><CloseIcon type="primary" /></button>
                    <p className={styles.numbers + ' text text_type_digits-large'}>034536</p>
                    <p className={'text text_type_main-medium'}>идентификатор заказа</p>
                    <button className={styles.button} type='button'><img src={done}/></button>
                    <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
                    <p className={styles.textInactive + ' text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>

    )
}

OrderDetails.propTypes = {
    closePopup: PropTypes.func.isRequired
}