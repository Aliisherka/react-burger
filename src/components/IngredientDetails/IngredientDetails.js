import styles from './IngredientDetails.module.css'
import PropTypes from 'prop-types';

export const IngredientDetails = (props) => {
    return (
        <>
            <img className={styles.img} src={props.data.img} alt={props.data.name}/>
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
        </>
    )
}

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired
}