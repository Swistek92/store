import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
  showRegister: false,
  registerType: "email",
  loginType: "email",
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
    switchRegisterType(state, action) {
      state.registerType = action.payload;
    },
    switchLoginType(state, action) {
      state.loginType = action.payload;
    },
  },
});

export const {
  showLogin,
  hideLogin,
  showRegister,
  hideRegister,
  switchRegisterType,
  switchLoginType,
} = modalSlice.actions;
export default modalSlice.reducer;
