// ingredientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api';

export const fetchAllIngredients = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  async () => {
    const response = await getIngredients();
    return response.data;
  }
);


const initialState = {
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
        state.error = action.error.message;
      });
  }
});

export const selectAllIngredients = state => state.ingredients.allIngredients;

export const { actions: ingredientsActions, reducer: ingredientsReducer } = ingredientsSlice;

// export const selectIng = (state) => state.ingredients.allIngredients;
// console.log(selectIng)
