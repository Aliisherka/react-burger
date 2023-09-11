import styles from './Constructor.module.css';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import {useEffect, useId, useRef} from 'react';
import { GIVE_UNIQUE_ID, REORDER_CONSTRUCTOR } from '../../services/actions/constructor';

import { useDrop, useDrag } from "react-dnd";

function Constructor({item, isLocked, extraClass, type, text, handleClose, _id, index}) {
    const dispatch = useDispatch();
    const uniqueId = useId();
    const ref = useRef(null);

    useEffect(() => {
        if(item.type !== 'bun' && item.index !== index) {
            dispatch({
                type: GIVE_UNIQUE_ID,
                _id: _id,
                uniqueId: uniqueId,
                index: index
            })
        }
    }, []);

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