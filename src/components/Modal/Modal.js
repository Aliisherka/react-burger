import ReactDOM from 'react-dom';
import React from 'react';

import styles from './Modal.module.css'

import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");

 export const Modal = (props) => {
    React.useEffect(() => {
        const closeByEsc = (event) => {
            if (event.key === 'Escape') {
                props.closePopup();
            }
        }

        document.addEventListener("keydown", closeByEsc);
        return () => {
          document.removeEventListener("keydown", closeByEsc);
        };
      }, []);

    return ReactDOM.createPortal (
        <div className={styles.popup}>
            <ModalOverlay closePopup={props.closePopup}/>
            <div className={styles.container}>
                <div className={styles.containerFlex}>
                    <h2 className={styles.title + ' text text_type_main-large'}>{props.title}</h2>
                    <button onClick={props.closePopup} className={styles.close}><CloseIcon type="primary" /></button>
                </div>
                {props.children}
            </div>
        </div>,
    modalRoot)
}