import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

// Estado inicial
const initialState: { favorites: Product[] } = {
    favorites: []
};

// Slice de favoritos
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        // Agregar producto a favoritos
        addFavorite(state, action: PayloadAction<Product>) {
            state.favorites.push(action.payload);
        },
        // Eliminar producto de favoritos
        removeFavorite(state, action: PayloadAction<Product>) {
            state.favorites = state.favorites.filter((product) => product.id !== action.payload.id);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
