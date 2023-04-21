import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

export const ModalOverlay = (props) => {
    return (
        <div onClick={props.closePopup} className={styles.overlay}></div>
    )
}

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired
}