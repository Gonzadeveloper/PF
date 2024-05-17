import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";

export interface CardProps extends Product {}

const Card: React.FC<CardProps> = ({
  id,
  image,
  name,
  description,
  price,
  stock,
  category,
  reviews,
}) => {
  return (
    <div className="col-2">
      <Link to={`/products/${id}`} className="card-link">
        <div className="card">
          <img src={image} className="card-img-top" alt="avatar" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Price: {price}</p>
            <p className="card-text">Descripción: {description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
