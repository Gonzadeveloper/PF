import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product, Filters } from "../../types";


const initialState: ProductsState = {
  products: [],
  filters: {
    name: '',
    category: { id: 0, name: 'Todos' },
    condition: 'Todos',
    minPrice: 0,
    maxPrice: Infinity,
    minStock: 0,
    maxStock: Infinity,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProductByName(state, action: PayloadAction<Product[]>) {
      state.products = [action.payload];
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
});

export const { setProducts, getProductByName, setFilters  } = productsSlice.actions;

export default productsSlice.reducer;
