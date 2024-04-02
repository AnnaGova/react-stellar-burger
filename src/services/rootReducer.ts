import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slice/ingredients/ingredientsSlice';
import  {burgerConstructorReducer}from './slice/constructor/burgerConstructorSlice';
import { modalReducer } from './slice/modal/modalSlice';
import { orderReducer } from './slice/order/orderSlice';
import { userReducer } from './slice/user/UserSlice';
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
