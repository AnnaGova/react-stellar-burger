import { burgerConstructorReducer, initialState, burgerConstructorActions } from "./burgerConstructorSlice";

const mockIngredient = {
  _id: "",
  name: "",
  type: "",
  image: "",
  price: 5,
  id: "",
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 5,
};


const mockStateWithIngredient = {
  ...initialState,
  burgerIngredients: [mockIngredient],
};

describe("burgerConstructor reducer", () => {
  test("add ingredient", () => {
    expect(
      burgerConstructorReducer(
        initialState,
        burgerConstructorActions.addIngredient(mockIngredient)
      )
    ).toEqual({
      ...initialState,
      burgerIngredients: [{ ...mockIngredient, id: expect.any(String) }],
    });
  });

  test("remove ingredient", () => {
    expect(
      burgerConstructorReducer(
        mockStateWithIngredient,
        burgerConstructorActions.removeIngredient({ id: mockIngredient.id })
      )
    ).toEqual({
      ...initialState,
      bun: null,
    });
  });

  test("sort ingredients", () => {
    expect(
      burgerConstructorReducer(
        mockStateWithIngredient,
        burgerConstructorActions.ingredientSort({ from: 0, to: 1 })
      )
    ).toEqual({
      ...initialState,
      burgerIngredients: [mockIngredient],
    });
  });

});
