import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/index';
import { Product } from '../../types';
import Card from '../Card/Card';
import { removeFavorite } from '../../Redux/Slices/FavoritesSlice';

const FavoritesList: React.FC = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    // Filtramos los productos para que solo se muestren los marcados como favoritos
    const favoriteProducts: Product[] = useSelector((state: RootState) => (
        state.products.products.filter(product => favorites.some(fav => fav.id === product.id))
    ));

    const handleToggleFavorite = (product: Product) => {
        console.log("Botón de favoritos clickeado en FavoritosList.tsx"); // Nuevo console.log para depuración
        if (favorites.some(fav => fav.id === product.id)) {
            dispatch(removeFavorite(product));
        }
    };

    return (
        <div className="row">
            {favoriteProducts.map((product: Product) => (
                <Card
                    key={product.id}
                    {...product}
                    isFavorite={true}
                    onToggleFavorite={() => handleToggleFavorite(product)}
                    isSearchPage={false} // Nueva prop
                />
            ))}
        </div>
    );
};

export default FavoritesList;
