import styles from "./app.module.css";
//import { data } from "../../utils/data";

import { AppHeader } from "../AppHeader/app-header"
import { BurgerIngredients } from "../BurgerIngredients/burger-Ingredients";
import { BurgersContructor } from "../BurgerConstructor/burger-constructor";
import { useEffect, useState } from "react";

const mainurl = 'https://norma.nomoreparties.space/api/'


function App() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetch(`${mainurl}ingredients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setIngredients(data.data))
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
        // Обработка ошибки: вывод сообщения пользователю, повторный запрос и т.д.
      });
  }, []);
  console.log(ingredients);

  return (
    <div className={styles.app}>
      	<AppHeader />
        <main className={styles.container}>
          <section>
          <BurgerIngredients  ingredients={ingredients}/>
          </section>
          <section>
          <BurgersContructor ingredients={ingredients}/>

          </section>

        </main>
    </div>
  );
}

export default App;






