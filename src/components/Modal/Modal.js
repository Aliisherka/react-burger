import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    
    useEffect(() => {
        const closeByEsc = (e) => {
            if(e.key === 'Escape') {
                props.handleCloseModal()
            }
        }
        
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    })
    return createPortal(
            (
                <div className={styles.modal}>
                    <div className={styles.container}>
                        <div className={styles.card + ' pl-10 pr-10 pt-10'}>
                            <h2 className='text text_type_main-large'>{props.title}</h2>
                            <button type='button' className={styles.close}><CloseIcon type="primary" onClick={props.handleCloseModal}/></button>
                        </div>
                        {props.children}
                    </div>
                    <ModalOverlay handleCloseModal={props.handleCloseModal}/>
                </div>
            ), modalRoot
        )
}

Modal.propTypes = {
    title: PropTypes.string,
    handleCloseModal: PropTypes.func.isRequired,
}

export default Modal;