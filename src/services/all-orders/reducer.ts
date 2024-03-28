import { createReducer } from "@reduxjs/toolkit";
import { OrderListType } from "../../utils/prop-types";
import { wsMessageOrder } from "./action";

interface OrderState {
  data: OrderListType | null;
}

export const initialState: OrderState = {
  data: null,
};

export const Orders = createReducer(initialState, (builder) => {
  builder.addCase(wsMessageOrder, (state, action) => {
    state.data = action.payload;
  });
});
