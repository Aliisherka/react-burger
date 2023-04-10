import React from 'react';
import styles from './app.module.css';

import {Header} from '../header/Header';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../burgerConstructor/BurgerConstructor';


export const App = () => {
    const [state, setState] = React.useState({
        data: [],
        success: false
    })

    React.useEffect(() => {
        const getData = async () => {
            fetch('https://norma.nomoreparties.space/api/ingredients')
                .then(res => res.json())
                .then(data => setState(data))
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
                        <BurgerIngredients data={state.data}/>
                        <BurgerConstructor data={state.data}/>
                </main>
                <div id="react-modals"></div>
            </>
        )
}
