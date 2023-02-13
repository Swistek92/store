import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringMappingType } from "typescript";

// export type MenuType = string[];

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  category: string;
  subCategory: SubCategory[];
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

const initCategories: Category[] = [
  {
    id: 1,
    category: "Kids",
    subCategory: [
      {
        id: 1,
        name: "Dresses",
      },
      {
        id: 2,
        name: "Jacket",
      },
    ],
  },
  {
    id: 2,
    category: "Man",
    subCategory: [
      {
        id: 1,
        name: "Tshirt",
      },
      {
        id: 2,
        name: "Jacket",
      },
    ],
  },
];

const initialState = {
  categories: initCategories,
  products: initProcuts,
};

// export const getProductCategories = createAsyncThunk(
//   "person/fetch",
//   async (thunkAPI) => {
//     try {
//       const response = await fetch("http://localhost:8000/person", {
//         method: "GET",
//       });
//       const data = response.json();
//       return data;
//     } catch (error) {
//       return error;
//     }
//   }
// );

export const ProductSlice = createSlice({
  name: "ProductCategory",
  initialState,
  reducers: {
    productCategory: (state, action) => {
      state.products = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getProductCategories.fulfilled, (state, action) => {
  //     state.categories = action.payload;
  //   });
  // },
});

export const { productCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
