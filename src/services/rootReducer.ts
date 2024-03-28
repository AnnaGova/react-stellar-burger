import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slice/ingredientsSlice';
import  {burgerConstructorReducer}from './slice/burgerConstructorSlice';
import { modalReducer } from './slice/modalSlice';
import { orderReducer } from './slice/orderSlice';
import { userReducer } from './slice/UserSlice';
import { feed } from './feed/reducer';
import { Orders } from './all-orders/reducer';



const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order:  orderReducer,
  user: userReducer,
  feed: feed,
  Orders: Orders,
});

export default rootReducer;
