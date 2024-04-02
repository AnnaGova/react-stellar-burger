import { ingredientsSlice, initialState } from "./ingredientsSlice";
import { IngredientType } from "../../../utils/prop-types";

const response = {
  data: [],
}

describe("ingredientsSlice", () => {
  test("get ingredients", () => {
    expect(
      ingredientsSlice.reducer(initialState, {
        type: "burgerIngredientsSlice/fetchIngredients/fulfilled",
        payload: response.data as IngredientType[],
      })
    ).toEqual({
      ...initialState,
      ingredients: response.data as IngredientType[],
    });
  });
});
