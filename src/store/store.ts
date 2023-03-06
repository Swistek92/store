import { modalSlice } from "./features/ModalSlice";
import { TopMenuSlice } from "./features/TopMenuSlice";
import { ProductSlice } from "./features/ProductSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    menu: TopMenuSlice.reducer,
    product: ProductSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
