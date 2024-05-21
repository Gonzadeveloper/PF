import { configureStore } from '@reduxjs/toolkit';
import productsreducers from './Slices/ProductsSlice';

const store = configureStore({
  reducer: {
    products: productsreducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;