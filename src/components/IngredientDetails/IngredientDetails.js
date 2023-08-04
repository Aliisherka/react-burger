import styles from './IngredientDetails.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import {dataPropTypes} from '../../propTypes/data';

function IngredientDetails(props) {
    const element = props.element[0];

    return(
        <Modal title={'Детали ингредиента'} handleCloseModal={props.handleCloseModal}>
            <div className={styles.details}>
                <img src={element.image_large}/>
                <p className='text text_type_main-medium pt-4 pb-8'>{element.name}</p>
                <div className={styles.info}>
                    <div>
                        <p className='text text_type_main-default text_color_inactive pb-2'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{element.calories}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive pb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{element.proteins}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive pb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{element.fat}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive pb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{element.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

IngredientDetails.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    element: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default IngredientDetails