import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from 'components/burger-constructor/BurgerConstructor';
import BurgerIngredients from 'components/burger-ingredients/BurgerIngredients';

import styles from './Home.module.css';

function HomePage() {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default HomePage;
