import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css'

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructor = (props) => {
    return (
        <section className={styles.burgerConstructor}>
           <div className={styles.BurgerComponents}>
                <div className={styles.burgerBun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1225}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <div className={styles.burgerMainSause}>
                    {props.data.map((item)=>(
                        item.type !== 'bun' &&
                            <div key={item._id} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                />
                            </div>
                    ))}
                </div>
                <div className={styles.burgerBun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={1225}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>  
            <div className={styles.burgerInfo + ' pr-4'}>
                <div className={styles.burgerPrice}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
}