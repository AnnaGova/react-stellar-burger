import styles from './constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from '../Modal/modal';
import { useMemo } from 'react';
import { OrderDetails } from '../OrderDetails/order-details';
import { burgerConstructorActions } from '../../services/slice/burgerConstructorSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { modalActions, selectActiveModal } from '../../services/slice/modalSlice';
import BurgerConstructorItem from '../BurgerConstructorItem/burger-constructor-item';
import { useDrop } from 'react-dnd';
import { fetchOrder } from '../../services/slice/orderSlice';
import { selectAllIngredients } from '../../services/slice/ingredientsSlice';

export function BurgersContructor() {

  const ingredientsInConstructor = useSelector((state) => state.burgerConstructor.burgerIngredients);//игредиенты, которые нахоятся в конструкторе
  const dispatch = useDispatch();
  const bun = useSelector(state => state.burgerConstructor.bun);//булки, которые находятся в конструкторе
  const modalState = useSelector(state => state.modal);
  const activeModal = useSelector(selectActiveModal);
  const ingredients = useSelector(selectAllIngredients);// все ингредиенты

  console.log(bun, 'булки')

  console.log(ingredientsInConstructor)

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (droppedIngredientId, monitor) => {
      onDropHandler(droppedIngredientId);
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  function onDropHandler(droppedIngredientId) {
    // Находим информацию о перетаскиваемом ингредиенте
    const draggedIngredient = ingredients.find(ingredient => ingredient._id === droppedIngredientId._id);

    if (draggedIngredient) {
      dispatch(burgerConstructorActions.addIngredient(draggedIngredient));
    }
  };

  const handleDeleteIngredient = (item) => dispatch(burgerConstructorActions.removeIngredient(item));




  // useEffect(() => {
  //   dispatch(burgerConstructorActions.addIngredient(draggedIngredient));
  // }, [dispatch]);


  //Функция для расчета суммы заказа
  const calcBurgerPrice = useMemo(() => {
    return () => {
      let totalPrice = 0;

      ingredientsInConstructor.forEach(addedIngredient => {
        const ingredient = ingredients.find(ingredient => ingredient._id === addedIngredient._id);
        if (ingredient) {
          totalPrice += ingredient.price + bun.price*2;
        }
      });
      return totalPrice;
    }
  }, [ingredientsInConstructor, ingredients, bun])

  const finalPrice = calcBurgerPrice(); // переменная для суммы заказа


  return (
    <section className={`${styles.container} mt-25`} >
      <div className={styles.order_container} ref={dropTarget} style={{ border: isHover ? '1px solid #4c4cff' : 'transparent' }}>

        <span className={styles.title}>
          {!isHover && !bun && ingredientsInConstructor.length === 0 && 'Перетащите сюда ингредиенты для бургера'}
          {isHover && 'Отпустите ингредиент над выделенной'}
        </span>

        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-8"
          />
        )}

        <ul className={styles.added_items}>
          {ingredientsInConstructor.map((ingredient, index) => (
            <>
              <BurgerConstructorItem
                item={ingredient}
                index={index}
                key={ingredient.id}
                handleDeleteIngredient={handleDeleteIngredient}
              />
            </>
          ))}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-8"
          />
        )}
        <div className={`${styles.order} mt-10 mr-8`}>
          <div className={`${styles.sum}`}>
            <p className="text text_type_digits-medium mr-2">${finalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => {
            dispatch(modalActions.openModal({ isOpen: true, content: 'Данные заказа', active: 'order' }));
            dispatch(fetchOrder({ ingredients: [...ingredientsInConstructor.map((e) => e._id), bun._id] }));
          }} disabled={ingredientsInConstructor.length === 0}>
            Оформить заказ
          </Button>
          {modalState.isOpen && activeModal === 'order' && (
            <Modal onClose={() => dispatch(modalActions.closeModal())}>
              <OrderDetails {...modalState.content} />
            </Modal>
          )}

        </div>
      </div>
    </section>
  );
}
