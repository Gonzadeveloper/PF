import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface FavoritesState {
    favorites: Product[]; // Cambiamos el tipo de favorites a Product[]
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Product>) => {
            // Agregamos el producto completo a la lista de favoritos
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<Product>) => {
            state.favorites = state.favorites.filter(product => product.id !== action.payload.id);
        },

    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.favorites;
export default favoritesSlice.reducer;
