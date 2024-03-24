import {getUser, getLoginUser, getRegisterUser, updateProfile, logoutUser, forgotPassword, resetPassword, } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getActionName, isActionPending, isActionRejected,} from "../../utils/redux-functuons";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { PayloadAction } from "@reduxjs/toolkit";

type State = { [key: string]: boolean | null;};

const initialState = {
  IsAuthChecked: false,
  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,
};

export const sliceName = "user";

export const checkUserAuth = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async (_, { dispatch }) => {
    try {
      const data = await getUser();
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(authCheck());
    }
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async (dataUser: { email: string; password: string; name: string })  => {
    const data = await getRegisterUser(dataUser);
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async (dataUser: { email: string; password: string }) => {
    const data = await getLoginUser(dataUser);
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data;
  }
);

export const logoutUsers = createAsyncThunk(
  `${sliceName}/logoutUser`,
  async () => {
    await logoutUser();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  }
);

export const forgotPasswords = createAsyncThunk(
  `${sliceName}/forgotPassword`,
  async (email: string) => {
    const data = await forgotPassword(email);
    return data;
  }
);

export const resetPasswords = createAsyncThunk(
  `${sliceName}/resetPassword`,
  async (data: { password: string; token: string }) => {
    const response = await resetPassword(data);
    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  `${sliceName}/updateUserInfo`,
  async (data: { email: string; name: string; password: string }) => {
    const response = await updateProfile(data);
    return response;
  }
);

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.IsAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(logoutUsers.fulfilled, (state) => {
        state.data = null;
      })
      .addMatcher(
        isActionPending(userSlice.name),
        (state: State, action: PayloadAction<any>) => {
          state[`${getActionName(action)}Request`] = true;
          state[`${getActionName(action)}Error`] = null;
        }
      )
      .addMatcher(
        isActionRejected(userSlice.name),
        (state: State, action: PayloadAction<any>) => {
          state[`${getActionName(action)}Request`] = action.payload;
          state[`${getActionName(action)}Error`] = action.payload;
        }
      );
  },
});

export const { authCheck } = userSlice.actions;
// export default userSlice.reducer;

export const { actions: userActions, reducer: userReducer } = userSlice;
