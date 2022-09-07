import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import UserService from "../../../Utils/axios/apis/user";
import {
  Auth,
  ChangePasswordData,
  LoginData,
  UserModel,
} from "../../../models/auth";
import { ServiceKeys } from "../../../models/serviceKeys";
import { ErrorHandler } from "../../../Utils/Error";

const initialState: Auth = {
  token: null,
  user: null,
  expiryDate: null,
  isLoading: false,
  error: null,
  authenticated: false,
  monoKey: null,
};

export const UserLogin = (data: LoginData) => async () => {
  try {
    const res = await UserService.Login(data);
    dispatch(AddUserData(res.data));
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(setLoading(false));
    dispatch(createError(ErrorHandler(err)));
  }
};

export const UserRegister = (data: UserModel) => async () => {
  try {
    const res = await UserService.CreateUser(data);
    dispatch(AddUserData(res.data));
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(setLoading(false));
    dispatch(createError(ErrorHandler(err)));
  }
};

export const UpdateUser = (data: UserModel) => async () => {
  try {
    const res = await UserService.UpdateUser(data);
    dispatch(setUser(res.data.updatedUser));
  } catch (err: any) {
    dispatch(setLoading(false));
    dispatch(createError(ErrorHandler(err)));
  }
};

export const verifyToken = (token: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserService.VerifyToken(token);
    if (res.data.user != null) {
      dispatch(
        setAuthenticated({
          state: true,
          data: res.data.user,
          mono: res.data.monoKey,
        }),
      );
    } else {
      localStorage.clear();
      dispatch(setLoading(false));
    }
  } catch (err) {
    dispatch(setAuthenticated({ state: false, data: null, mono: null }));
    dispatch(setLoading(false));
  }
};

export const AddAccountKeys = (data: ServiceKeys) => async () => {
  try {
    const res = await UserService.AddAccountKeys(data);
    dispatch(setMonoKey(res.data));
  } catch (err: any) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const UpdateAccountKeys = (data: ServiceKeys) => async () => {
  try {
    const res = await UserService.UpdateAccountKeys(data);
    dispatch(setMonoKey(res.data));
  } catch (err: any) {
    dispatch(createError(ErrorHandler(err)));
  }
};

export const ChangePassword = (data: ChangePasswordData) => async () => {
  try {
    const res = await UserService.ChangePassword(data);
    dispatch(setUser(res.data));
  } catch (err: any) {
    dispatch(createError(ErrorHandler(err)));
  }
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.token = action.payload.token[0];
      state.expiryDate = action.payload.token[1];
      state.user = action.payload.user;
      state.authenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    createError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    reset: () => initialState,
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload.state;
      state.user = action.payload.data;
      state.monoKey = action.payload.mono;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setState: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiryDate = action.payload.expiryDate;
      state.monoKey = action.payload.monoKey;
    },
    setMonoKey: (state, action) => {
      state.monoKey = action.payload.monoPrivateKey;
    },
  },
});

export const {
  reset,
  setLoading,
  setAuthenticated,
  setState,
  createError,
  AddUserData,
  setMonoKey,
  setUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;
