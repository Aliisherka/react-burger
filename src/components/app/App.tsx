import React from 'react';
import styles from './app.module.css';

import { data } from '../../utils/data';

import Header from '../header/Header';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../burgerConstructor/BurgerConstructor';


class App extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <main style={{display: 'flex', justifyContent: 'center', gap: '40px'}}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </main>
            </>
        )
    }
}

export default App;
