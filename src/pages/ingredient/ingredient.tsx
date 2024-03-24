import { IngredientCompound } from "../../components/IngredientCompound/ingredient-compound";
import styles from './ingredient.module.css'

export function IngredientPage () {
  return (
    <div className={styles.container}>
    <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
    <IngredientCompound />
    </div>
  )
}
