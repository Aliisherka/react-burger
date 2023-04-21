import React from 'react';
import styles from './app.module.css';

import {Header} from '../header/Header';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../burgerConstructor/BurgerConstructor';
import { BurgerContext } from '../../context/burgerContext';


export const App = () => {
    const [state, setState] = React.useState({
        success: false,
        ingredients: null
    });

    React.useEffect(() => {
        const getData = async () => {
            fetch('https://norma.nomoreparties.space/api/ingredients')
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then(data => setState({success: data.success, ingredients: data.data}))
                .catch(e => {
                    console.log('ошибка загрузки карточек');
                });
        }
        getData();
    }, [])

        return (
            <>
                <Header/>
                <main className={styles.main}>
                    {state.success && (
                    <BurgerContext.Provider value={state.ingredients}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </BurgerContext.Provider>
                    )}
                </main>
            </>
        )
}
