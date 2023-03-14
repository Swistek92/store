import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios/AxiosClient";
import { LoginValues } from "../../Components/Modals/Login/Login";
export const loginUser = createAsyncThunk(
  "user/login",
  async (user: LoginValues, thunkAPI) => {
    try {
      const response = await AxiosClient.post("/api/user/login", user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user:
    {
      accessToken: "",
      account: "",
      avatar: "",
      name: "",
      role: "",
      type: "",
      updatedAt: "",
      __v: 0,
      _id: "",
    } || null,
  isError: false,
  errorMessage: "",
  isLogin: false,
  isLoading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // const user = action.payload.data;
      state.user = action.payload.data;
      state.isLogin = true;
      state.isError = false;

      console.log("fulfielld", action);
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      console.log("rejected", action);
      state.user = initialState.user;
      state.isLoading = false;
      state.isLogin = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
});
export default userSlice.reducer;
