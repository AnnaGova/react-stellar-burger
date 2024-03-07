import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slice/ingredientsSlice';
import  {burgerConstructorReducer}from './slice/burgerConstructorSlice';
import { modalReducer } from './slice/modalSlice';
import { orderReducer } from './slice/orderSlice';


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order:  orderReducer
});

export default rootReducer;
