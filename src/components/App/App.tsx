import styles from './App.module.css';
import {useEffect, useState} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: []
  });

  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    fetch(URL)
    .then(res => {
      if (res.ok) {
        setState({...state, isLoading: true})
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)})
    .then(data => setState({ ...state, data: data.data, success: data.success, isLoading: false}))
    .catch(error => {
      setState({...state, isLoading: false, hasError: true})
      console.log(error);
    })
  }, [URL]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.success && 
          <>
            <BurgerIngredients data={state.data}/>
            <BurgerConstructor data={state.data} />
          </>
        }
      </main>
    </>
  );
}

export default App;
