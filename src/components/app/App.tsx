import React from 'react';
import styles from './app.module.css';

import { data } from '../../utils/data';

import {Header} from '../header/Header';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../burgerConstructor/BurgerConstructor';


export const App = () => {
        return (
            <>
                <Header/>
                <main className={styles.main}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </main>
            </>
        )
}
