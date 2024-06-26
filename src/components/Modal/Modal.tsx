import React, { useEffect, FunctionComponent, ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from 'components/modal-overlay/ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals')!;

interface IModal {
    title?: string;
    handleCloseModal: () => void;
    children: ReactNode;
    textSize?: string;
    extraClass?: string;
    isIngredient?: boolean;
}

const Modal: FunctionComponent<IModal> = ({
  title, handleCloseModal, children, isIngredient,
}) => {
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  });

  const Title = isIngredient ? (
    <div className={`${styles.card} pl-10 pr-10 pt-10`}>
      <h2 className={'text text_type_main-large'}>{title}</h2>
      <button data-cy='closeBtn' type='button' className={styles.close}>
        <CloseIcon type='primary' onClick={handleCloseModal} />
      </button>
    </div>
  ) : (
    <button type='button' className={styles.closeButton}>
      <CloseIcon type='primary' onClick={handleCloseModal} />
    </button>
  );

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        {Title}
        {children}
      </div>
      <ModalOverlay handleCloseModal={handleCloseModal} />
    </div>,
    modalRoot,
  );
};

export default Modal;
