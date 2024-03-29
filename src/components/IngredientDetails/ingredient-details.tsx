import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-details.module.css'
import { useDrag, DragPreviewImage } from "react-dnd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface IBurgerIngredientDetails {
  _id: string;
  image: string;
  name: string;
  price: number;
}


export function IngredietDetails({_id, image, name, price}: IBurgerIngredientDetails ) {
  const location = useLocation();
  const itemMargin = "mt-5 ml-4";
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <ul >
      <li className={`${styles.item} ${itemMargin}`}  ref={dragRef}>
        <Link className={styles.link} to={`/ingredients/${_id}`} state={{ backgroundLocation: location }}>

          {/* Обертка для превью изображения при перетаскивании */}
          <DragPreviewImage connect={preview} src={image} />
          <img src={image} alt={name} style={{ opacity: isDragging ? 0.7 : 1.5 }} />
          <div className={styles.price}>
            <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">{name}</p>
          </Link>
      </li>
    </ul >
  );

}
