// orderSlice.js
// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/api';

const initialState = {
  newOrder: null,
  loading: true,
  error: null,
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderResult',
  async (ingredients) => {
      const data = await createOrder(ingredients);
      return data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload.order;
        state.error = null;
      })

      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.newOrder = null; // Установка состояния order в null при возникновении ошибки
      });
  }
});

export default orderSlice.reducer;



export const { actions: orderActions, reducer: orderReducer } = orderSlice;
