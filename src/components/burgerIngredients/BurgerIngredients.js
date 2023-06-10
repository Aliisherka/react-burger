import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css'

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import { BurgerContext } from '../../context/burgerContext';

export const BurgerIngredients = () => {
        const [current, setCurrent] = React.useState('one')

        const [state, setState] = React.useState({
            visible: false
        })

        const data = React.useContext(BurgerContext)

        const [ingridient, setIngridient] = React.useState();

        const openPopup = (e) => {
            setState({visible: true})
            const findIngridient = data.find(item => item._id === e.currentTarget.id)
            setIngridient({
                img: findIngridient.image_large,
                name: findIngridient.name,
                calories: findIngridient.calories,
                proteins: findIngridient.proteins,
                fat: findIngridient.fat,
                carbohydrates: findIngridient.carbohydrates
            })
        }
    
        const closePopup = () => {
            setState({visible: false})
        }

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
                        {data.map((item)=>(
                            item.type === 'bun' && 
                                <div onClick={openPopup} id={item._id} className={styles.item} key={item._id}>
                                    <img className='pb-1' src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <div className={styles.itemPrice + ' pb-1'}>
                                        <p className={styles.itemNumber}>{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p id='text' className={styles.text + ' text text_type_main-default'}>{item.name}</p>
                                </div>
                        ))}
                    </div>
                    <h2 className={styles.title + ' text text_type_main-medium'}>Соусы</h2>
                    <div className={styles.cards}>
                        {data.map((item)=>(
                            item.type === 'sauce' && 
                                <div onClick={openPopup} id={item._id} className={styles.item} key={item._id}>
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
                        {data.map((item)=>(
                            item.type === 'main' && 
                                <div onClick={openPopup} id={item._id} className={styles.item} key={item._id}>
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
                {state.visible && (
                    <Modal title={'Детали ингредиента'} closePopup={closePopup}>
                        <IngredientDetails data={ingridient}/> 
                    </Modal>
                )}
            </section>
        )
}