import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
  showRegister: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showLogin(state) {
      state.showLogin = true;
      state.showRegister = false;
    },
    hideLogin(state) {
      state.showLogin = false;
    },
    showRegister(state) {
      state.showRegister = true;
      state.showLogin = false;
    },
    hideRegister(state) {
      state.showRegister = false;
    },
  },
});

export const { showLogin, hideLogin, showRegister, hideRegister } =
  modalSlice.actions;
export default modalSlice.reducer;
