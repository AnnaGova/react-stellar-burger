import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerConstructorActions } from "../../services/slice/burgerConstructorSlice"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/prop-types";
import styles from "./burger-constructor-item.module.css";

function BurgerConstructorItem({ item, index, handleDeleteIngredient }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "sortItem",
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "sortItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Не меняем объект сам на себя
      if (dragIndex === hoverIndex) {
        return;
      }


      const hoverBoundingRect = ref.current?.getBoundingClientRect();


      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;


      const clientOffset = monitor.getClientOffset();


      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }


      dispatch(burgerConstructorActions.ingredientSort({ to: dragIndex, from: hoverIndex }));


      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      key={item.id}
      className={styles.item}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        index={index}
        handleClose={() => handleDeleteIngredient(item)}
      />
    </li>
  );
}

BurgerConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteIngredient: PropTypes.func,
};

export default BurgerConstructorItem;
