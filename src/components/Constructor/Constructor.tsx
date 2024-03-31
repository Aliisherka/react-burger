/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'services/hooks';
import { REORDER_CONSTRUCTOR } from 'services/actions/constructor';
import { IConstructorIngredient, IIngredient } from 'services/types/data';

import styles from './Constructor.module.css';

interface IConstructorProps {
    item: IIngredient & IConstructorIngredient;
    isLocked?: boolean;
    extraClass?: string;
    type?: 'top' | 'bottom' | undefined;
    text: string;
    handleClose?: () => void;
    index: number;
}

function Constructor({
  item, isLocked, extraClass, type, text, handleClose, index,
}: IConstructorProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<any>({
    accept: 'constructor',
    drop({ index: order, item }) {
      if (item.type !== 'bun') {
        dispatch({
          type: REORDER_CONSTRUCTOR,
          order,
          item,
          index,
        });
      }
    },
  });

  const [{ opacity }, dragRef] = useDrag({
    type: 'constructor',
    item: { index, item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  dragRef(drop(ref));

  return (
    <div
      data-cy='droppedIngredients'
      id={item._id}
      className={styles.ingredient}
      ref={ref}
      style={{ opacity }}
    >
      {item.type !== 'bun' && <DragIcon type='primary' />}
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
  );
}

export default Constructor;
