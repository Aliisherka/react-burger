import styles from './App.module.css';
import {useEffect, useState} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { ConstructorContext } from '../../services/constructorContext';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: []
  });

  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    getIngredients(URL, state, setState);
  }, [URL]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.success && 
          <>
            <BurgerIngredients data={state.data}/>
            <ConstructorContext.Provider value={state.data}>
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </>
        }
      </main>
    </>
  );
}

export default App;
