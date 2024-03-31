import React from 'react';

import styles from './ModalWait.module.css';

const ModalWait: any = () => (
  <div className={styles.modal}>
    <div className={styles.container}>
      <p className={`${styles.text} text text_type_main-large`}>
        Идет оформление заказа...
      </p>
    </div>
    <div className={styles.overlay}></div>
  </div>
);

export default ModalWait;
