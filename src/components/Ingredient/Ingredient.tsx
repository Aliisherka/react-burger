import styles from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrag } from "react-dnd";
import { useSelector } from '../../services/hooks';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { IIngredient } from '../../services/types/data';

interface IIngredientProps {
    _id: string; 
    image: string; 
    price: number; 
    name: string; 
    type:string; 
    __v:number ;
    item: IIngredient
}

function Ingredient({_id, image, price, name, type, __v, item}: IIngredientProps) {
    const location = useLocation();
    const [{opacity}, dragRef] = useDrag({  
        type: 'ingredient',
        item: {_id, type, item}, 
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
    })
    const { draggedBun } = useSelector((store) => store.constructor);

    const ingredientId: string = _id;
    let countBun: number = 0;


    if(draggedBun && draggedBun._id === _id) {
        countBun = draggedBun.__v;
    }
    return(
        <Link key={ingredientId} to={`/ingredients/${ingredientId}`} state={{ background: location }} className={styles.link}>
            <div ref={dragRef} id={_id}  className={styles.ingredient} style={{opacity}}>
                <img className='pl-4 pr-4 pb-1' src={image} alt={'картинка булки бургера'}/>
                <div className={styles.price}>
                    <p className='text text_type_digits-default'>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={styles.text + ' text text_type_main-default pt-1'}>{name}</p>
                { type === 'bun'
                    ? (countBun > 0) && <Counter count={countBun} size="default" extraClass="m-1" />
                    : (__v > 0) && <Counter count={__v} size="default" extraClass="m-1" />
                }
            </div>
        </Link>
    )
}

export default Ingredient;