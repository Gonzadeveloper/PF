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
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProductByName(state, action: PayloadAction<Product>) {
      state.products = [action.payload];
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters(state) {
      state.filters = {
        name: "",
        category: { id: 0, name: "Todos" },
        condition: "Todos",
        minPrice: 0,
        maxPrice: Infinity,
        minStock: 0,
        maxStock: Infinity,
      };
    },
    setProductDetails(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    postProduct(state, action: PayloadAction<Product>) {
      state.products = [...state.products, action.payload];
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});


export const {
  setProducts,
  getProductByName,
  setFilters,
  setProductDetails,
  postProduct,
  resetFilters,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;


export default productsSlice.reducer;