import api from "../../src/utils/api";

const BASE_URL = api.baseUrl;
const BUN = "Булка";
const FILLING_1 = "Начинка 1";
const FILLING_2 = "Начинка 2";
const ORDER_NUMBER = "12345";
const testUrl = "http://localhost:3000/react-stellar-burger";

Cypress.Commands.add("dragIngredientToConstructor", (ingredient) => {
  cy.get('[data-cy="ingredients"]').contains(ingredient).trigger("dragstart");
  cy.get('[data-cy="constructor"]').trigger("drop");
});

Cypress.Commands.add("createOrder", () => {
  cy.dragIngredientToConstructor(BUN);
  cy.dragIngredientToConstructor(FILLING_1);
  cy.dragIngredientToConstructor(FILLING_2);
  cy.get('[data-cy="order-button"]').click();
});

describe("drag and drop to constructor works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}/ingredients`, {
      fixture: "ingredients.json",
    });
    cy.viewport(1920, 1080);
    cy.visit(testUrl);
  });
  it("should drag bun to constructor", () => {
    cy.dragIngredientToConstructor(BUN);
    cy.get('[data-cy="bun-top"]').contains(BUN).should("exist");
    cy.get('[data-cy="bun-bottom"]').contains(BUN).should("exist");
  });
  it("should drag ingredient to constructor", () => {
    cy.dragIngredientToConstructor(FILLING_1);
    cy.get('[data-cy="constructor-ingredients"]')
      .contains(FILLING_1)
      .should("exist");
  });
});

describe("order works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}/ingredients`, {
      fixture: "ingredients.json",
    });
    cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "login.json" });
    cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "post-order.json" });
    cy.setCookie("accessToken", "mockAccessToken");
    cy.setCookie("refreshToken", "mockRefreshToken");
    cy.viewport(1920, 1080);
    cy.visit(testUrl);
  });
  afterEach(() => {
    cy.clearCookies();
  });
  it("should create order", () => {
    cy.createOrder();
    cy.get('[data-cy="order-number"]').contains(ORDER_NUMBER).should("exist");
  });
  it("should clear constructor after order", () => {
    cy.createOrder();
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="order-number"]').should("not.exist");
    cy.get('[data-cy="constructor-ingredients"]')
      .contains(FILLING_1)
      .should("not.exist");
  });
});
