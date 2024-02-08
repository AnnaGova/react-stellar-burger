import { useState } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsSection } from '../IngredientsSection/ingredients-section';


export function BurgerIngredients({ ingredients, sectionName }) {
  const [current, setCurrent] = useState('one')

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
  const stuffing = ingredients.filter((ingredient) => ingredient.type === 'main');

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={`${styles.tab} pb-5`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
        <IngredientsSection sectionName="Булки" ingredients={buns} />
        <IngredientsSection sectionName="Соусы" ingredients={sauces} />
        <IngredientsSection sectionName="Начинка" ingredients={stuffing} />

    </section>
  );
}




