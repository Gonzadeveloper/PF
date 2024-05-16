import React from 'react';

export interface CardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number; // Propiedad requerida por el componente Card
  category: string; // Propiedad requerida por el componente Card
  reviews: { rating: number; comment: string }[]; // Propiedad requerida por el componente Card
}

const Card: React.FC<CardProps> = ({ id, image, name, description, price, stock, category, reviews }) => {
  return (
    <div className="col-2">
      <div className="card">
        <img src={image} className="card-img-top" alt="avatar" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Descripción: {description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;