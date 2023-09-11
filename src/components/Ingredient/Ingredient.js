import styles from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

function Ingredient({_id, image, price, name, type, __v}) {
    const location = useLocation();
    const [{opacity}, dragRef] = useDrag({  
        type: 'ingredient',
        item: {_id, type}, 
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
    })
    const { draggedBun } = useSelector(store => store.constructor);

    const ingredientId = _id;
    let countBun = null;


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
                    ? (countBun > null) && <Counter count={countBun} size="default" extraClass="m-1" />
                    : (__v > null) && <Counter count={__v} size="default" extraClass="m-1" />
                }
            </div>
        </Link>
    )
}

export default Ingredient;