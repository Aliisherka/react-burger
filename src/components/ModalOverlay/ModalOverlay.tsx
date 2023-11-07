import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
    handleCloseModal: () => void;
}

function ModalOverlay({handleCloseModal}: IModalOverlayProps) {
    return(
        <div className={styles.overlay} onClick={handleCloseModal}></div>
    )
}

export default ModalOverlay;