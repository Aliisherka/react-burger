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

  useEffect(() => {
    getIngredients(state, setState);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.success && 
          <>
            <ConstructorContext.Provider value={state.data}>
              <BurgerIngredients />
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </>
        }
      </main>
    </>
  );
}

export default App;
