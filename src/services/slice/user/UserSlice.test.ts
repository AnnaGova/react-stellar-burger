import {userSlice, initialState} from "./UserSlice";

const mockGetUserInfoResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
    password: "123123",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockRegisterResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockLoginResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockUserInfoUpdateResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
};

describe("userSlice", () => {
  test("check user auth", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/checkUserAuth/fulfilled",
        payload: mockGetUserInfoResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockGetUserInfoResponse,
      getUserRequest: false,
    });
  });
  test("register user", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/registerUser/fulfilled",
        payload: mockRegisterResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockRegisterResponse,
      registerUserRequest: false,
    });
  });

  test("login user", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/loginUser/fulfilled",
        payload: mockLoginResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockLoginResponse,
      loginUserRequest: false,
    });
  });

  test("update user info", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/updateUserInfo/fulfilled",
        payload: mockUserInfoUpdateResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockUserInfoUpdateResponse,
    });
  });

  test("logout user", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/logoutUser/fulfilled",
      })
    ).toEqual({
      ...initialState,
      data: null,
    });
  });
});
