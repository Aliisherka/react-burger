import styles from './Constructor.module.css';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import {useRef} from 'react';
import { REORDER_CONSTRUCTOR } from '../../services/actions/constructor';

import { useDrop, useDrag } from "react-dnd";

function Constructor({item, isLocked, extraClass, type, text, handleClose, index}) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'constructor',
        drop({ index: order, item}) {
            if (item.type !== 'bun') {
                dispatch({
                    type: REORDER_CONSTRUCTOR,
                    order,
                    item,
                    index
                })
            }
        }
    })

    const [{opacity}, dragRef] = useDrag({  
        type: 'constructor',
        item: {index, item}, 
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    dragRef(drop(ref));

    return (
        <div className={styles.ingredient}  ref={ref} style={{opacity}}>
            { item.type !== 'bun' && <DragIcon type="primary" /> }
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={item.price}
                thumbnail={item.image}
                extraClass={extraClass}
                handleClose={handleClose}
            /> 
        </div>
    )
}

export default Constructor;