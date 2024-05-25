import { configureStore } from "@reduxjs/toolkit";
import productsreducers from "./Slices/ProductsSlice";
import favoritesReducer from "./Slices/FavoritesSlice";

const store = configureStore({
  reducer: {
    products: productsreducers,
    favorites: favoritesReducer,
    // Incluimos el slice de favoritos en el store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
