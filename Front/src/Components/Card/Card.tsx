import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CardProps } from "../../types";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../Redux/Slices/CartSlice";


const Card: React.FC<CardProps> = ({ id, image, name, price, description, condition, stock, category, reviews, isFavorite, isSearchPage, onToggleFavorite}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, name, price, description, condition, stock, category, reviews, isFavorite, isSearchPage, onToggleFavorite }));
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };



  return (
    <div className="col-2">
      <div className="card">
        <Link to={`/products/${id}`} className="card-link">
          <img src={image} className="card-img-top" alt="avatar" />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Descripción: {description}</p>
        </div>

        <button onClick={handleAddToCart}>
          <FaShoppingCart />
        </button>
      </div>
      <div className="card-footer">
        <button
          onClick={handleToggleFavorite}
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
        >
          {isSearchPage ? (isFavorite ? "Quitar de favoritos" : "Agregar a favoritos") : (isFavorite ? "Quitar de favoritos" : "Quitar de favoritos")}

        </button>
      </div>
    </div>
  );
}
;

export default Card;
