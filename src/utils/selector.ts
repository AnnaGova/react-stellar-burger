import { createSelector } from "@reduxjs/toolkit";
import { userSlice } from "../services/slice/UserSlice";
import { RootState } from "../services/store";

// Селектор для проверки состояния аутентификации
export const getIsAuthChecked = createSelector(
  (state: RootState) => state[userSlice.name].IsAuthChecked,
  (isAuthChecked) => isAuthChecked
);
