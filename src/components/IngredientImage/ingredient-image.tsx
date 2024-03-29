import { useSelector } from "../../services/store";
import { IngredientType } from "../../utils/prop-types";
import styles from "./ingredient-image.module.css";

interface IngredientIconProps {
  ingredient: string;
  counter?: number;
}

export function IngredientImage({ ingredient, counter }: IngredientIconProps) {
  const allIngredients = useSelector((store) => store.ingredients.allIngredients);
  const currentIngredient: IngredientType | undefined = allIngredients.find(
    (item) => item._id === ingredient
  );
  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.icon}
        src={currentIngredient.image}
        alt={currentIngredient.name}
      />
      {counter ? (
        <p
          className={`${styles.counter} text text_type_main-default`}
        >{`+${counter}`}</p>
      ) : null}
    </div>
  );
};
