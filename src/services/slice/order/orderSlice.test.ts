import { initialState, fetchOrder, getOrders } from "./orderSlice";
import orderSlice from "./orderSlice";


const mockFetchOrderResultResponse = {
  order: { number: 123 },
};

const mockGetOrderResponse = {
  success: true,
  orders: [
    {
      number: 123,
      name: "Order Name",
    },
  ],
};

describe("orderDetailsSlice", () => {
  test("post order", () => {
    expect(
      orderSlice(initialState, {
        type: fetchOrder.fulfilled.type,
        payload: mockFetchOrderResultResponse,
      })
    ).toEqual({
      order: mockFetchOrderResultResponse.order,
      currentOrder: null,
      loading: false,
      error: null,
    });
  });

  test("get order", () => {
    expect(
      orderSlice(initialState, {
        type: getOrders.fulfilled.type,
        payload: mockGetOrderResponse.orders[0],
      })
    ).toEqual({
      currentOrder: mockGetOrderResponse.orders[0],
      order: null,
      loading: false,
      error: null,
    });
  });
});
