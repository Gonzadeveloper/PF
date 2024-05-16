import Card from "../Card/Card";
import React from 'react';
import { useSelector } from 'react-redux';
import { CardProps } from '../Card/Card';
import { RootState } from '../../Redux/index';

function Search() {
  const products = useSelector((state: RootState) => state.products.products);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h4>Filtros</h4>
          </div>
          <div className="col-md-10">
            <div className="row">
              {products.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  image={card.image}
                  name={card.name}
                  description={card.description}
                  price={card.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Search;