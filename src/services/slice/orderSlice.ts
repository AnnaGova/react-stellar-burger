// orderSlice.js
// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { createOrder,  } from '../../utils/api';
import { OrderType } from '../../utils/prop-types';
import { RootState } from '../store';
//import { getOrder } from '../../utils/api';
import api from '../../utils/api';

interface IOrderDetailsState {
  newOrder: { number: number | null; } | null;
  currentOrder: OrderType | null;
  loading: boolean; // Флаг загрузки
  error: string | null; // Ошибка (если есть)
}


const initialState: IOrderDetailsState = {
  newOrder: null,
  loading: true,
  error: null,
  currentOrder: null,
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderResult',
  async (ingredients: any) => {
      const data = await api.createOrder(ingredients);
      return data;
  }
);

export const getOrders = createAsyncThunk<
  OrderType,
  string,
  { state: RootState }
>('order/getOrder', async (number) => {
  const data = await api.getOrder(number);
  return data.orders[0];
});


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
        state.error = action.error.message || null;
        state.newOrder = null; // Установка состояния order в null при возникновении ошибки
      });
  }
});

export default orderSlice.reducer;



export const { actions: orderActions, reducer: orderReducer } = orderSlice;
