import styles from "./ingredient-compound.module.css";
import { useParams } from "react-router";
import { useSelector } from "../../services/store";
import { selectAllIngredients } from "../../services/slice/ingredientsSlice";

export function IngredientCompound() {
  const { id } = useParams();
  const ingredients = useSelector(selectAllIngredients);
  const ingredient = ingredients.find((item) => item._id === id);



  if (!ingredient) {
    console.error("Ингредиент не найден");
    return null; // Или что-то другое, что должно отображаться, если ингредиент не найден
  }

  return (
    <div className={`${styles.container} pl-25 pr-25 pb-15`}>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <h3 className="text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
        <li className={styles.item}>
          <p>Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={styles.item}>
          <p>Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={styles.item}>
          <p>Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p>Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

