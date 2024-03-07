import { IngredietDetails } from "../IngredientDetails/ingredient-details";
import styles from './ingredients-section.module.css';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/modal";
import { IngredientCompound } from "../IngredientCompound/ingredient-compound";
import { modalActions,  selectActiveModal} from '../../services/slice/modalSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectAllIngredients } from "../../services/slice/ingredientsSlice";
import PropTypes from 'prop-types';
//import { bunsInCinstructor } from "../../services/slice/burgerConstructorSlice";


export function IngredientsSection({  sectionName, type }) {

  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const activeModal = useSelector(selectActiveModal);
  const ingr = useSelector(selectAllIngredients);
  const filt = ingr.filter((ingredient)=> ingredient.type === type)
  //const buns = useSelector(bunsInCinstructor)


  return (
    <>
      <h2 className="text text_type_main-medium pt-5">{sectionName}</h2>
      <ul className={styles.ingredients_list}>
        {filt.map(data => (
          <li key={data._id} className={styles.ingredient}  onClick={() => {
            dispatch(modalActions.openModal({ isOpen: true, title:'Детали ингердиента', content: {...data}, active: 'ingredients' }));
          }}>
            <IngredietDetails
              key={data}
              {...data}
            />
            <Counter />
          </li>
        ))}
      </ul>
      {modalState.isOpen && activeModal === 'ingredients' && (
        <Modal  onClose={() => dispatch(modalActions.closeModal())}>
          <IngredientCompound {...modalState.content} />
        </Modal>
      )}
    </>
  );
}

IngredientsSection.propTypes = {
  sectionName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
