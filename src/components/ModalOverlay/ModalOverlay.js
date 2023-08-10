import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay(props) {
    return(
        <div className={styles.overlay} onClick={props.handleCloseModal}></div>
    )
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalOverlay;