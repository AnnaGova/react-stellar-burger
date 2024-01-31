import styles from "./app.module.css";
import { data } from "../../utils/data";

import { AppHeader } from "../appHeader/app-header"
import { BurgerIngredients } from "../BurgerIngredients/burgerIngredients";
import { ConstructorB } from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState(null)
    useEffect(() => {
    fetch(`${mainurl}ingredients`)
    .then((response) => response.json())
    .then((data) => setIngredients(data.data))
  }, [])
  console.log(ingredients)

  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "0",
      	fontSize: "1.5rem"
      }}>
      	<AppHeader />
        <div className={styles.container}>
          <BurgerIngredients ingredients={ingredients}/>
          <ConstructorB />
        </div>

      </pre>
    </div>
  );
}

export default App;


const mainurl = 'https://norma.nomoreparties.space/api/'



