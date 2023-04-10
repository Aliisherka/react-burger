import styles from './IngredientDetails.module.css'
import PropTypes from 'prop-types';

import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const IngredientDetails = (props) => {
    return (
        <div className={styles.popup}>
            <ModalOverlay closePopup={props.closePopup}/>
            <div className={styles.container}>
                <div className={styles.containerFlex}>
                    <h2 className={styles.title + ' text text_type_main-large'}>Детали ингредиента</h2>
                    <button onClick={props.closePopup} className={styles.close}><CloseIcon type="primary" /></button>
                </div>
                <img src={props.data.img}/>
                <p className={styles.text + ' pt-4 text text_type_main-medium'}>{props.data.name}</p>
                <div className={styles.details}>
                    <div>
                        <p  className={styles.detailText + ' pb-2 text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                        <p className={styles.detailText + ' text text_type_digits-default text_color_inactive'}>{props.data.calories}</p>
                    </div>
                    <div>
                        <p className={styles.detailText + ' pb-2 text text_type_main-default text_color_inactive'}>Белки, г</p>
                        <p className={styles.detailText + ' text text_type_digits-default text_color_inactive'}>{props.data.proteins}</p>
                    </div>
                    <div>
                        <p className={styles.detailText + ' pb-2 text text_type_main-default text_color_inactive'}>Жиры, г</p>
                        <p className={styles.detailText + ' text text_type_digits-default text_color_inactive'}>{props.data.fat}</p>
                    </div>
                    <div>
                        <p className={styles.detailText + ' pb-2 text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                        <p className={styles.detailText + ' text text_type_digits-default text_color_inactive'}>{props.data.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    closePopup: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}