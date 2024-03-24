import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slice/ingredientsSlice';
import  {burgerConstructorReducer}from './slice/burgerConstructorSlice';
import { modalReducer } from './slice/modalSlice';
import { orderReducer } from './slice/orderSlice';
import { userReducer } from './slice/UserSlice';



const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order:  orderReducer,
  user: userReducer,
});

export default rootReducer;
