import React from "react";
import FavoritesList from "../FavoritesList/FavoritesList"; // Asegúrate de importar el componente correctamente

function Favoritos() {
    return (
        <div className="container">
            <h1>Favoritos</h1>
            <FavoritesList />
        </div>
    );
}

export default Favoritos;
