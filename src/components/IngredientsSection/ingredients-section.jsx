import { IngredietDetails } from "../IngredientDetails/ingredient-details";
import styles from './ingredients-section.module.css';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Modal } from "../Modal/modal";
import { IngredientCompound } from "../IngredientCompound/ingredient-compound";

export function IngredientsSection({ ingredients, sectionName }) {
  const [ingredientModal, setSelectedIngredient] = useState(null);

  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };

  return (
    <>
      <h2 className="text text_type_main-medium pt-5">{sectionName}</h2>
      <ul className={styles.ingredients_list}>
        {ingredients.map((ingredient, index) => (
          <li className={styles.ingredient} key={index} onClick={() => openModal(ingredient)}>
            <IngredietDetails
              image={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
            />
            <Counter />
          </li>
        ))}
      </ul>
      {ingredientModal && (
        <Modal isOpen={true} onClose={closeModal} title="Детали ингредиента">
          <IngredientCompound {...ingredientModal} />
        </Modal>
      )}
    </>
  );
}
