import styles from './constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { Modal } from '../Modal/modal';
import { useState } from 'react';
import { OrderDetails } from '../OrderDetails/order-details';


export function BurgersContructor({ ingredients }) {
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const other = ingredients.filter((ingredient) => ingredient.type !== 'bun');
  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <section className={`${styles.container} text text_type_main-small`} >
      <div className={styles.order_container}>
      {buns.length > 0 && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={buns[0].image}
              extraClass="ml-8"
            />
      )}
        <ul className={styles.added_items}>
          {other.map((ingredient) => (
            <li key={ingredient._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                extraClass="m-2"
              />
            </li>
          ))}
        </ul>
        {buns.length > 0 && (
        <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={buns[0].image}
              extraClass="ml-8"
            />
        )}
        <div className={`${styles.order} mt-10 mr-8`}>
          <div className={`${styles.sum}`}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => setModalOpen(true)}>
            Оформить заказ
          </Button>
          <Modal
          isOpen={modalIsOpen}
          onClose={()=> setModalOpen(false)}
           >
            <OrderDetails />
          </Modal>

        </div>
      </div>
    </section>
  );
}

BurgersContructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
