import styles from './BurgerIngredients.module.css';
import React, { useMemo, UIEvent } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';

import Ingredient from '../Ingredient/Ingredient';
import { IIngredient } from '../../utils/types';

enum IngredientType {
    BUN = 'bun',
    SAUCE = 'sauce',
    MAIN = 'main'
}

function BurgerIngredients() {
    const { ingredient } = useSelector((state: any) => state.ingredient);

    const [current, setCurrent] = React.useState<IngredientType>(IngredientType.BUN);

    const scroll = (e: UIEvent<HTMLDivElement>): void => {
        const target = e.target as HTMLElement;
        if (target.scrollTop < 300) {
            setCurrent(IngredientType.BUN)
        } else if (target.scrollTop >= 300 && target.scrollTop < 820) {
            setCurrent(IngredientType.SAUCE)
        } else if (target.scrollTop >= 820){
            setCurrent(IngredientType.MAIN)
        }
    }

    const buns = useMemo<IIngredient[]>(() => 
        ingredient.filter((bun: IIngredient) => {
            return bun.type === 'bun';
        }),
        [ingredient]
    );

    const sauces = useMemo<IIngredient[]>(() =>
        ingredient.filter((sauce: IIngredient) => {
            return sauce.type === 'sauce';
        }),
        [ingredient]
    );

    const mains = useMemo<IIngredient[]>(() =>
        ingredient.filter((main: IIngredient) => {
            return main.type === 'main';
        }),
        [ingredient]
    )

    return(
        <>
            <div className={styles.burgerIngredients + ' mb-10'}>
                <h1 className={styles.title + ' pb-5 pt-10 text text_type_main-large'}>Соберите бургер</h1>
                <div style={{ display: 'flex' }} className='pb-10'>
                    <Tab value={IngredientType.BUN} active={current === IngredientType.BUN} onClick={() => setCurrent(IngredientType.BUN)}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent(IngredientType.SAUCE)}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={() => setCurrent(IngredientType.MAIN)}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients} onScroll={scroll}>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Булки</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {buns.map((bun: IIngredient) => {
                             return <Ingredient key={bun._id} {...bun} item={bun}/>
                        })}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Соусы</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {sauces.map((sauce: IIngredient) => {
                            return <Ingredient key={sauce._id} {...sauce} item={sauce}/>
                        })}
                    </div>
                    <h2 className={styles.ingredientsTitle + ' text text_type_main-medium'}>Начинка</h2>
                    <div className={styles.ingredientsColumn + ' pl-4 pr-4 pt-6 pb-10'}>
                        {mains.map((main: IIngredient) => {
                            return <Ingredient key={main._id} {...main} item={main}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BurgerIngredients;