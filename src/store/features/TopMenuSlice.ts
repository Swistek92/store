import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MenuType = string[];

const Menu: MenuType = ["Home", "Woman", "Man", "Kids", "Best Seller"];

const initialState = Menu;

export const TopMenuSlice = createSlice({
  name: "topMenu",
  initialState,
  reducers: {
    getTopMenu: (state, action) => {},
  },
});

export const { getTopMenu } = TopMenuSlice.actions;
export default TopMenuSlice.reducer;
