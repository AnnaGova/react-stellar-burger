// ingredientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api';
import { IngredientType } from '../../utils/prop-types';
import { RootState } from '../store';

interface IngredientsState {
  allIngredients: IngredientType[];
  loading: boolean;
  error: string | null;
}

export const fetchAllIngredients = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  async () => {
    const response = await getIngredients();
    return response.data;
  }
);


const initialState: IngredientsState = {
  allIngredients: [],
  loading: false,
  error: null
};


export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.allIngredients = action.payload;
        state.error = null;
      })
      .addCase(fetchAllIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  }
});

export const selectAllIngredients = (state: RootState) => state.ingredients.allIngredients;

export const { actions: ingredientsActions, reducer: ingredientsReducer } = ingredientsSlice;

// export const selectIng = (state) => state.ingredients.allIngredients;
// console.log(selectIng)
