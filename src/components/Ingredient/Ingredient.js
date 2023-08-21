import styles from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

function Ingredient({_id, image, price, name, handleOpenModal, type, __v}) {
    const [{opacity}, dragRef] = useDrag({  
        type: 'ingredient',
        item: {_id, type}, 
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
    })
    const { draggedBun } = useSelector(store => store.constructor);

    let countBun = null;

    if(draggedBun) {
        draggedBun.map(item => {
            if (item._id === _id) {
                countBun = item.__v;
            }
        })
    }

    return(
        <div ref={dragRef} id={_id}  className={styles.ingredient} onClick={handleOpenModal} style={{opacity}}>
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
    )
}

export default Ingredient;