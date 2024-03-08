import styles from "./app.module.css";
//import { data } from "../../utils/data";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from "../AppHeader/app-header"
import { BurgerIngredients } from "../BurgerIngredients/burger-Ingredients";
import { BurgersContructor } from "../BurgerConstructor/burger-constructor";
import React from 'react';


function App() {

  return (
  <DndProvider backend={HTML5Backend}>
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients  />

        <BurgersContructor />

      </main>
    </div>
   </DndProvider>
  );
}

export default App;



