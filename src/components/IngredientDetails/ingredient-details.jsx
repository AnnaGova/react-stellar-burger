import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-details.module.css'


export function IngredietDetails ({image, name, price}) {
  return (
    <div>
      <img src={image} alt={name} />
      <p className="text text_type_main-small pb-5">{name}</p>
      <div className={`${styles.price} p-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
}

