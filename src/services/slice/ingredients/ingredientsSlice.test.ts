import { ingredientsSlice, initialState } from "./ingredientsSlice";
import { IngredientType } from "../../../utils/prop-types";

const response = {
  data: [],
}

describe("ingredientsSlice", () => {
  test("get allIngredients", () => {
    expect(
      ingredientsSlice.reducer(initialState, {
        type: "burgerIngredientsSlice/fetchIngredients/fulfilled",
        payload: response.data as IngredientType[],
      })
    ).toEqual({
      ...initialState,
      allIngredients: response.data as IngredientType[],
    });
  });
});
