import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StringMappingType } from "typescript";

// export type MenuType = string[];

interface Category {
  _id: number;
  name: string;
  nestedCategories: string[];
  active: boolean;
}

interface Product {
  id: number;
  imageSrc: Function;
  name: string;
  price: number;
}

const initProcuts: Product[] = [
  {
    id: 1,
    imageSrc: require("../../assets/img/shop-1.jpg"),
    name: "Product1 ",
    price: 123,
  },
  {
    id: 2,
    imageSrc: "../../../assets/img/shop-2.jpg",
    name: "Product2 ",
    price: 123,
  },
  {
    id: 3,
    imageSrc: "../../../assets/img/shop-3.jpg",
    name: "Product3 ",
    price: 123,
  },
  {
    id: 4,
    imageSrc: "../../../assets/img/shop-4.jpg",
    name: "Product4 ",
    price: 123,
  },
];

const initCategories: Category[] = [];

const initialState = {
  categories: initCategories,
  products: initProcuts,
};

export const fetchProductCategories = createAsyncThunk(
  "person/fetch",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/api/category/");
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const ProductSlice = createSlice({
  name: "ProductCategory",
  initialState,
  reducers: {
    productCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      // console.log(action);
      state.categories = action.payload;
    });
    builder.addCase(fetchProductCategories.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { productCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
