import styles from './IngredientDetails.module.css';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { IIngredient } from '../../services/types/data';

function IngredientDetails() {
    const { ingredientId } = useParams();
    const { ingredient } = useSelector((state) => state.ingredient);
    
    const element: IIngredient = ingredient.filter((item: IIngredient)=> item._id === ingredientId)[0];
    return(
        <div className={styles.details}>
            {element 
            ? <>
                <img src={element.image_large} alt={'картинка ингридиента бургера'}/>
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
            </>
            : null}
        </div>
    )
}

export default IngredientDetails