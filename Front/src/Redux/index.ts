import { configureStore } from '@reduxjs/toolkit';
import productsreducers from './Slices/ProductsSlice';
import cartReducer from './Slices/CartSlice'

const store = configureStore({
  reducer: {
    products: productsreducers,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;