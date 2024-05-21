import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/index";
import Card from "../Card/Card";
import { addFavorite, removeFavorite } from "../../Redux/Slices/FavoritesSlice";
import { Product } from "../../types";

function Search() {
  const products = useSelector((state: RootState) => state.products.products);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleToggleFavorite = (product: Product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      console.log("Removiendo producto de favoritos:", product); // Agregamos un console.log para verificar que el producto se está eliminando correctamente
      dispatch(removeFavorite(product));
    } else {
      console.log("Agregando producto a favoritos:", product); // Agregamos un console.log para verificar que el producto se está agregando correctamente
      dispatch(addFavorite(product));
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
                isSearchPage={true} // Nueva prop
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
