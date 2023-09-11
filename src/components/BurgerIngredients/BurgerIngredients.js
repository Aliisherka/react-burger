import styles from './BurgerIngredients.module.css';
import React, {useEffect, useMemo} from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';

import { CLOSE_ELEMENT, OPEN_ELEMENT } from '../../services/actions/modal';
import { getIngredient } from '../../services/actions/ingredient';
import Ingredient from '../Ingredient/Ingredient';

function BurgerIngredients() {
    const { ingredient } = useSelector(state => state.ingredient);
    const { visibleElement } = useSelector(state => state.modal);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredient());
    }, [dispatch]);

    const [current, setCurrent] = React.useState('bun');

    const scroll = (e) => {
        if (e.target.scrollTop < 300) {
            setCurrent('bun')
        } else if (e.target.scrollTop >= 300 && e.target.scrollTop < 820) {
            setCurrent('sauce')
        } else if (e.target.scrollTop >= 820){
            setCurrent('main')
        }
    }

    const handleOpenModal = (e) => {
        dispatch({ type: OPEN_ELEMENT, e, ingredient });
    }

    const handleCloseModal = () => {
        dispatch({ type: CLOSE_ELEMENT });
    }

    const buns = useMemo(() => 
        ingredient.filter((bun) => {
            return bun.type === 'bun';
        }),
        [ingredient]
    );

    const sauces = useMemo(() =>
        ingredient.filter((sauce) => {
            return sauce.type === 'sauce';
        }),
        [ingredient]
    );

    const mains = useMemo(() =>
        ingredient.filter((main) => {
            return main.type === 'main';
        }),
        [ingredient]
    )

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
                <div className={styles.ingredients} onScroll={scroll}>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Булки</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {buns.map((bun, index) => {
                             return <Ingredient key={index} {...bun} handleOpenModal={handleOpenModal}/>
                        })}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Соусы</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {sauces.map((sauce, index) => {
                            return <Ingredient key={index} {...sauce} handleOpenModal={handleOpenModal}/>
                        })}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Начинка</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {mains.map((main, index) => {
                            return <Ingredient key={index} {...main} handleOpenModal={handleOpenModal}/>
                        })}
                    </div>
                </div>
            </div>
            <div>
                {visibleElement && 
                <Modal title={'Детали ингредиента'} handleCloseModal={handleCloseModal}>
                    <IngredientDetails />
                </Modal> }
            </div>
        </>
    );
}

export default BurgerIngredients;