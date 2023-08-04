import styles from './BurgerIngredients.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {dataPropTypes} from '../../propTypes/data';

import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function BurgerIngredients({data}) {
    const [current, setCurrent] = React.useState('bun')

    const [state, setState] = useState({
        visible: false,
        element: []
    })

    const handleOpenModal = (e) => {
        setState({
            visible: true,
            element: data.filter((item) => {
                return item._id === e.currentTarget.id;
            })
        })
    }

    const handleCloseModal = () => {
        setState({visible: false})
    }

    const closeByEsc = (e) => {
        if(e.key === 'Escape') {
            handleCloseModal()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    })

    const buns = data.filter((bun) => {
        return bun.type === 'bun';
    })

    const sauces = data.filter((sauce) => {
        return sauce.type === 'sauce';
    })

    const mains = data.filter((main) => {
        return main.type === 'main';
    })

    return(
        <>
            <div className={styles.burgerIngredients + ' mb-10'}>
                <h1 className={styles.title + ' pb-5 pt-10 text text_type_main-large'}>Соберите бургер</h1>
                <div style={{ display: 'flex' }} className='pb-10'>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients}>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Булки</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {buns.map((bun) =>(
                            <div id={bun._id} className={styles.ingredient} key={bun._id} onClick={handleOpenModal}>
                                <img className='pl-4 pr-4 pb-1' src={bun.image}/>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default'>{bun.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.text + ' text text_type_main-default pt-1'}>{bun.name}</p>
                                <Counter count={1} size="default" extraClass="m-1" />
                            </div>
                        ))}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Соусы</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {sauces.map((sauce) =>(
                            <div className={styles.ingredient} key={sauce._id} id={sauce._id} onClick={handleOpenModal}>
                                <img className='pl-4 pr-4 pb-1' src={sauce.image}/>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default'>{sauce.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.text + ' text text_type_main-default pt-1'}>{sauce.name}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Начинка</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {mains.map((main) =>(
                            <div className={styles.ingredient} key={main._id} id={main._id} onClick={handleOpenModal}>
                                <img className='pl-4 pr-4 pb-1' src={main.image}/>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default'>{main.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.text + ' text text_type_main-default pt-1'}>{main.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{overflow: 'hidden'}}>
                {state.visible && state.element && <IngredientDetails element={state.element} handleCloseModal={handleCloseModal} closeByEsc={closeByEsc}/>}
            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerIngredients;