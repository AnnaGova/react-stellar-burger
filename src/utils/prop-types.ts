export type IngredientType = {
  _id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  id: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};
export type WsConnect = {
  wsUrl: string;
  withTokenRefresh: boolean;
};

export type OrderType = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  id?: string;
};

export type OrderListType = {
  success: boolean;
  orders: OrderType[];
  total: number;
  totalToday: number;
};

export type UserType = {
  email: string;
  name: string;
};

export type UserRegisterType = {
  password: string;
} & UserType;

type ServerResponse<T> = {
  success: boolean;
} & T;

export type RefreshResponseWithTokenType = ServerResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type GetOrderType = ServerResponse<{
  orders: OrderType[];
}>;
