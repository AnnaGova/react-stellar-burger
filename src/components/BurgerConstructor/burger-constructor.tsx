import styles from './constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from '../Modal/modal';
import { useMemo } from 'react';
import { OrderDetails } from '../OrderDetails/order-details';
import { burgerConstructorActions } from '../../services/slice/burgerConstructorSlice';
import { useSelector, useDispatch } from '../../services/store';
import { modalActions, selectActiveModal } from '../../services/slice/modalSlice';
import BurgerConstructorItem from '../BurgerConstructorItem/burger-constructor-item';
import { useDrop } from 'react-dnd';
import { fetchOrder } from '../../services/slice/orderSlice';
import { selectAllIngredients } from '../../services/slice/ingredientsSlice';
import { bunsInConstructor } from '../../services/slice/burgerConstructorSlice';
import { IngredientType } from '../../utils/prop-types';
import { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';



export function BurgersContructor() {

  const ingredientsInConstructor = useSelector((state: RootState) => state.burgerConstructor.burgerIngredients);//игредиенты, которые нахоятся в конструкторе
  const dispatch = useDispatch();
  const bun = useSelector(bunsInConstructor);//булки, которые находятся в конструкторе
  const modalState = useSelector((state: RootState) => state.modal);
  const activeModal = useSelector(selectActiveModal);
  const ingredients = useSelector(selectAllIngredients);// все ингредиенты
  const user = useSelector((state: RootState) => state.user.data)
  const navigate = useNavigate();


  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (droppedIngredientId: IngredientType, monitor) => {
      onDropHandler(droppedIngredientId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver()
    })
  });

  function onDropHandler(droppedIngredientId: IngredientType) {
    // Находим информацию о перетаскиваемом ингредиенте
    const draggedIngredient = ingredients.find((ingredient) => ingredient._id === droppedIngredientId._id);

    if (draggedIngredient) {
      dispatch(burgerConstructorActions.addIngredient(draggedIngredient));
    }
  };

  const handleDeleteIngredient = (item: IngredientType) => dispatch(burgerConstructorActions.removeIngredient(item));


  //Функция для расчета суммы заказа
  const calcBurgerPrice = useMemo(() => {
    return () => {
      let totalPrice = 0;

      ingredientsInConstructor.forEach(addedIngredient => {
        const ingredient  = ingredients.find(ingredient => ingredient._id === addedIngredient._id);
        if ( bun ) {
          totalPrice +=  (bun.price * 2);
        } else if (ingredient) { // проверка ингредиента
          totalPrice += ingredient.price;
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

            <BurgerConstructorItem
              item={ingredient}
              index={index}
              key={ingredient.id}
              handleDeleteIngredient={handleDeleteIngredient}
            />

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
          <Button htmlType="button" type="primary" size="large" onClick={() => { if (!user) {
            navigate('/login')
          }
            dispatch(modalActions.openModal({ isOpen: true, content: 'Данные заказа', active: 'order' }));
            dispatch(fetchOrder({ ingredients: [...ingredientsInConstructor.map((e) => e._id), bun ? bun._id : ""] }));
          }} disabled={ingredientsInConstructor.length === 0}>
            Оформить заказ
          </Button>
          {modalState.isOpen && activeModal === 'order' && (
            <Modal title={""} onClose={() => dispatch(modalActions.closeModal())}>
              <OrderDetails />
            </Modal>
          )}

        </div>
      </div>
    </section>
  );
}
