import { v4 as uuid } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from "../../utils/prop-types";


interface IConstructorState {
  bun: IngredientType | null;
  burgerIngredients: IngredientType[];
}

const initialState: IConstructorState = {
  burgerIngredients: [],
  bun: null,
};


export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      if (action.payload && action.payload.type === 'bun') {
        state.burgerIngredients = state.burgerIngredients.filter(ingredient => ingredient.type !== 'bun');
        state.bun = action.payload;
      } else {
        state.burgerIngredients.push({ ...action.payload, id: uuid() });
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.burgerIngredients = state.burgerIngredients.filter(ingredient => ingredient.id !== id);
    },
    ingredientSort(state, action) {
      state.burgerIngredients.splice(
        action.payload.to,
        0,
        state.burgerIngredients.splice(action.payload.from, 1)[0]
      );
    },
  }
});



export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const burgerConstructorActions = burgerConstructorSlice.actions;
export const bunsInConstructor = (state: {burgerConstructor: IConstructorState}) => state.burgerConstructor.bun;
export const IngredientsAdded = (state: {burgerConstructor: IConstructorState}) => state.burgerConstructor.burgerIngredients;
