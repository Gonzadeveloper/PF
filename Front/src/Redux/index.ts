import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import productsreducers from "./Slices/ProductsSlice";
import favoritesReducer from "./Slices/FavoritesSlice";

const store = configureStore({
  reducer: {
    products: productsreducers,
    favorites: favoritesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
