import React from 'react';
import FavoritesList from '../../Components/FavoritesList/FavoritesList'; // Importamos el componente FavoritesList

const Favorites: React.FC = () => {
    return (
        <div className="container">
            <h1>Mis Favoritos</h1>
            <FavoritesList /> {/* Renderizamos el componente FavoritesList */}
        </div>
    );
};

export default Favorites;