import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css'

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerIngredients = (props) => {
        const [current, setCurrent] = React.useState('one')
        return (
            <section>
                <h1 className={styles.title + ' text text_type_main-large'}>Соберите бургер</h1>
                <div className={styles.tab + ' pt-5'}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.burgers}>
                    <h2 className={styles.title + ' text text_type_main-medium'}>Булки</h2>
                    <div className={styles.cards}>
                        {props.data.map((item)=>(
                            item.type === 'bun' && 
                                <div className={styles.item} key={item._id}>
                                    <img className='pb-1' src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <div className={styles.itemPrice + ' pb-1'}>
                                        <p className={styles.itemNumber}>{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.text + ' text text_type_main-default'}>{item.name}</p>
                                </div>
                        ))}
                    </div>
                    <h2 className={styles.title + ' text text_type_main-medium'}>Соусы</h2>
                    <div className={styles.cards}>
                        {props.data.map((item)=>(
                            item.type === 'sauce' && 
                                <div className={styles.item} key={item._id}>
                                    <img className='pb-1' src={item.image} alt={item.name}/>
                                    <div className={styles.itemPrice + ' pb-1'}>
                                        <p className={styles.itemNumber}>{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.text + ' text text_type_main-default'}>{item.name}</p>
                                </div>
                        ))}
                    </div>
                    <h2 className={styles.title + ' text text_type_main-medium'}>Начинка</h2>
                    <div className={styles.cards}>
                        {props.data.map((item)=>(
                            item.type === 'main' && 
                                <div className={styles.item} key={item._id}>
                                    <img className='pb-1' src={item.image} alt={item.name}/>
                                    <div className={styles.itemPrice + ' pb-1'}>
                                        <p className={styles.itemNumber}>{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.text + ' text text_type_main-default'}>{item.name}</p>
                                </div>
                        ))}
                    </div>
                </div>
            </section>
        )
}

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
}