import { createSelector } from "@reduxjs/toolkit";
import { userSlice } from '../services/slice/UserSlice';

export const getIsAuthChecked = createSelector(
  (state) => state[userSlice.name].IsAuthChecked,
  (isAuthChecked) => isAuthChecked
);
