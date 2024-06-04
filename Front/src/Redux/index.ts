
import cartReducer from './Slices/CartSlice'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import productsreducers from "./Slices/ProductsSlice";
import favoritesReducer from "./Slices/FavoritesSlice";
import categoriesReducer from "./Slices/CategoriesSlice";
import orderReducer from "./Slices/OrdersSlice";


const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsreducers,
    cart: cartReducer,
    favorites: favoritesReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
