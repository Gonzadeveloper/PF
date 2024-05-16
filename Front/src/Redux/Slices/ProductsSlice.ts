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
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
