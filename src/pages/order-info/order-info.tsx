import { useParams } from "react-router";
import styles from "./order-info.module.css";
import { useDispatch, useSelector } from "../../services/store";
import React, { useEffect } from "react";
import { IngredientImage } from "../../components/IngredientImage/ingredient-image";
import { CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { SpinnerCircular } from "spinners-react";
import { getOrders } from "../../services/slice/orderSlice";
import { OrderType, IngredientType } from "../../utils/prop-types";

export const  OrderInfo: React.FC=({children}) =>{
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.order);
  const { number } = useParams();
  const allIngredients = useSelector((state) => state.ingredients.allIngredients);
  console.log(allIngredients);


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


  useEffect(() => {
    if (number) {
      dispatch(getOrders(number));
    }
  }, [dispatch, number]);

  console.log('hhgg', number, currentOrder)

  return (
    <>
      {loading ? (
        <SpinnerCircular color="red" />
      ) : (
        currentOrder && (
          <div className={`${styles.order_info_container} pl-10 pr-10 pb-15`}>
            <p
              className={`${styles.order_number} text text_type_digits-default mb-10`}
            >{`#${currentOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">
              {currentOrder.name}
            </h2>
            <p
              className="text text_type_main-default mb-15"
              style={{ color: currentOrder.status === "done" ? "#0cc" : "" }}
            >
              {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
            </p>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <div className={styles.ingredients_container}>
              {currentOrder.ingredients
                .reduce((unique: string[], item: string) => {
                  return unique.includes(item) ? unique : [...unique, item];
                }, [])
                .map((item, index) => {
                  const ingredient = allIngredients?.find(
                    (ingredient) => ingredient._id === item
                  );
                  return (
                    ingredient && (
                      <div key={index} className={styles.ingredient}>
                        <div className={styles.ingredient_name}>
                          <IngredientImage ingredient={ingredient?._id} />
                          <p className="text text_type_main-default">
                            {ingredient.name}
                          </p>
                        </div>
                        <div className={styles.price_container}>
                          <p className="text text_type_digits-default">
                            {`${
                              currentOrder.ingredients.filter((i) => i === item)
                                .length
                            } x`}
                          </p>
                          <p className="text text_type_digits-default">
                            {ingredient.price}
                          </p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div className={styles.total}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(currentOrder.createdAt)} />{" "}
                i-GMT+3
              </p>
              <div className={styles.price_container}>
                <p className="text text_type_digits-default">
                  {SumOrder(currentOrder, allIngredients)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              {children}
            </div>
          </div>
        )
      )}
    </>
  );
}

