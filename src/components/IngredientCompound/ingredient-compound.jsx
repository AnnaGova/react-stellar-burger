import styles from "./ingredient-compound.module.css";
import PropTypes from 'prop-types';


export function IngredientCompound ({calories, carbohydrates, fat, image, name, proteins })  {

  return (
    <>
      <div className={`${styles.container} pl-25 pr-25 pb-15`}>
      <img className={styles.image} src={image} alt={name} />
      <h3 className="text_type_main-medium mt-4 mb-8">{name}</h3>
      <ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
        <li className={styles.item}>
          <p>Калории, ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li className={styles.item}>
          <p>Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li className={styles.item}>
          <p>Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li className={styles.item}>
          <p>Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>


    </>
  );
}

IngredientCompound.propTypes = {
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
};
