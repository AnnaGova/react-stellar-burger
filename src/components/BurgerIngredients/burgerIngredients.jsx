import styles from './ingredients.module.css'

export function BurgerIngredients({ ingredients }) {
  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
    </section>
  )
}
