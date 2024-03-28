import { createReducer } from "@reduxjs/toolkit";
import { OrderListType } from "../../utils/prop-types";
import { wsMessageFeed } from "./action";

interface OrderState {
  data: OrderListType | null;
}

export const initialState: OrderState = {
  data: null,
};

export const feed = createReducer(initialState, (builder) => {
  builder.addCase(wsMessageFeed, (state, action) => {
    state.data = action.payload;
  });
});
