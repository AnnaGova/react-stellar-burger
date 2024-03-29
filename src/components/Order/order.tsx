import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/store";
import { IngredientImage } from "../IngredientImage/ingredient-image";
import styles from "./order.module.css"
import { useLocation } from "react-router";
import { OrderType, IngredientType } from "../../utils/prop-types";
import { Link } from "react-router-dom";

interface OrderProps {
  order: OrderType;
  url?: string;
  showStatus?: boolean;
}

function Order({ order, url, showStatus = false }: OrderProps) {
  const allIngredients = useSelector((store) => store.ingredients.allIngredients);
  const location = useLocation();
  const maxNumberOfIngredients = 6;

  const SumOrder = (
    order: OrderType,
    ingredients: IngredientType[]
  ): number => {
    let totalPrice = 0;
    order.ingredients.forEach((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        totalPrice += ingredient.price;
      }
    });
    return totalPrice;
  };



  return (
    <Link
      to={`${url}/${order.number}`}
      state={{ backgroundLocation: location }}
      className={styles.link}
    >
      <div className={styles.container}>
        <div className={styles.order_info}>
          <p
            className={`text text_type_digits-default`}
          >{`#${order.number}`}</p>
          <p
            className={`${styles.order_info} text text_type_main-default text_color_inactive`}
          >
            <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
          </p>
        </div>
        <h2 className={`${styles.order_title} text text_type_main-medium`}>
          {order.name}
        </h2>
        {showStatus ? (
          <p
            className={`${styles.order__status} text text_type_main-default`}
            style={{ color: order.status === "done" ? "#0CC" : "" }}
          >
            {order.status === "done" ? "Выполнен" : "Готовится"}
          </p>
        ) : null}
        <div className={styles.ingredients_container}>
          <div className={styles.ingredients}>
            {order.ingredients
              .slice(0, maxNumberOfIngredients)
              .map((ingredient, index) => (
                <IngredientImage
                  key={index}
                  ingredient={ingredient}
                  counter={
                    index === maxNumberOfIngredients - 1
                      ? order.ingredients.length - maxNumberOfIngredients
                      : undefined
                  }
                />
              ))}
          </div>
          <div className={styles.sum}>
            <p className="text text_type_digits-default">
              {SumOrder(order, allIngredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Order;
