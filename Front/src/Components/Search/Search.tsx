import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/index";
import Card from "../Card/card";
import { addFavorite, removeFavorite } from "../../Redux/Slices/FavoritesSlice";
import { Product } from "../../types";

function Search() {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  // Estado local para los productos favoritos
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Función para agregar o eliminar un producto de favoritos
  const handleToggleFavorite = (product: Product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      // Si el producto ya está en favoritos, lo eliminamos
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
      dispatch(removeFavorite(product)); // Pasamos el objeto completo del producto
    } else {
      // Si el producto no está en favoritos, lo agregamos
      setFavorites([...favorites, product]);
      dispatch(addFavorite(product)); // Pasamos el objeto completo del producto
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <h4>Filtros</h4>
        </div>
        <div className="col-md-10">
          <div className="row">
            {products.map((product) => (
              <Card
                key={product.id}
                {...product}
                isFavorite={favorites.some((fav) => fav.id === product.id)}
                onToggleFavorite={() => handleToggleFavorite(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
