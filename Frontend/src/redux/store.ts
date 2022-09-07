import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './features/Users/auth';
import UtilReducer from './features/Utils/utils';
import AccountReducer from "./features/Users/accounts"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils : UtilReducer,
    accounts : AccountReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector