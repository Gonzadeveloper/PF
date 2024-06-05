import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CardProps } from "../../types";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { addToCart } from "../../Redux/Slices/CartSlice";
import './Card.css'

const Card: React.FC<CardProps> = ({
  id, image, name, price, description, condition, stock, category, reviews, isFavorite, isSearchPage, onToggleFavorite
}) => {
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
    <div className="col-3">
      <div className="card custom-card">
        <Link to={`/products/${id}`} className="card-link">
          <img src={image} className="card-img-top" alt="avatar" />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Precio: {price}</p>
          <p className="card-text">Descripción: {description}</p>
        </div>
        <div className="card-icons">
          <button onClick={handleAddToCart} className="cart-btn">
            <FaShoppingCart />
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;