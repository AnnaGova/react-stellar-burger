import { IngredietDetails } from "../IngredientDetails/ingredient-details";
import styles from './ingredients-section.module.css';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/modal";
import { IngredientCompound } from "../IngredientCompound/ingredient-compound";
import { modalActions,  selectActiveModal} from '../../services/slice/modalSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectAllIngredients } from "../../services/slice/ingredientsSlice";
import PropTypes from 'prop-types';
import { bunsInConstructor } from "../../services/slice/burgerConstructorSlice"
import { IngredientsAdded } from "../../services/slice/burgerConstructorSlice";
import { RootState } from "../../services/store";

interface IingredientsSection {
  sectionName: string;
  type: string;
}



export const  IngredientsSection:React.FC<IingredientsSection> = ({  sectionName, type}) => {

  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);
  const activeModal = useSelector(selectActiveModal);
  const ingr = useSelector(selectAllIngredients);
  const filt = ingr.filter((ingredient)=> ingredient.type === type)
  const buns = useSelector(bunsInConstructor)
  const addedIngredients = useSelector(IngredientsAdded)




  return (
    <>
      <h2 className="text text_type_main-medium pt-5">{sectionName}</h2>
      <ul className={styles.ingredients_list}>
        {filt.map(data => (
          <li key={data._id} className={styles.ingredient}>
            <IngredietDetails
              key={data._id}
              {...data}

            />
            <Counter count={(sectionName === "Булки" && buns && buns._id === data._id ? 2 : addedIngredients.filter(ingredient => ingredient._id === data._id).length)}/>
          </li>
        ))}
      </ul>
      {modalState.isOpen && activeModal === 'ingredient' && (
        <Modal title="Детали Ингредиента" onClose={() => dispatch(modalActions.closeModal())}>
          <IngredientCompound  />
        </Modal>
      )}
    </>
  );
}

IngredientsSection.propTypes = {
  sectionName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
