import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../types";

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      console.log(state.products);
    },
    getProductByName(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      
      
    }
  },
});

export const { setProducts, getProductByName } = productsSlice.actions;

export default productsSlice.reducer;
