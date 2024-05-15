import React from 'react';

interface CardProps {
  id: number;
  img: string;
  title: string;
  content: string;
  price: number;
  ratings: any[];
}

const Card: React.FC<CardProps> = ({ id, img, title, content, price, ratings }) => {
  return (
    <div className="col-2">
      <div className="card">
        <img src={img} className="card-img-top" alt="avatar" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Price: {price}</p>
          <p className="card-text">Descripción: {content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;