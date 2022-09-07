import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UtilsModel } from "../../../models/Utils";

const initialState : UtilsModel = {
  drawerState: false,
  leftDrawerState: false,
  profileView : false
};

const UtilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setDrawerState: (state, action : PayloadAction<boolean>) => {
      state.drawerState = action.payload;
    },
    setLeftDrawerState: (state, action : PayloadAction<boolean>) => {
      state.leftDrawerState = action.payload;
    },
    setProfileView: (state, action : PayloadAction<boolean>) => {
      state.profileView = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setDrawerState, setLeftDrawerState, setProfileView, reset } = UtilSlice.actions;

export default UtilSlice.reducer;
