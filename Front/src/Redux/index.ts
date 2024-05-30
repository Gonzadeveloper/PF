import cartReducer from './Slices/CartSlice'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import productsreducers from "./Slices/ProductsSlice";
import favoritesReducer from "./Slices/FavoritesSlice";
import cartMiddleware from './Slices/middleware';


const store = configureStore({
  reducer: {
    products: productsreducers,
    cart: cartReducer,
    favorites: favoritesReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cartMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
