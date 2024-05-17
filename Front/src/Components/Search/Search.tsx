import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { RootState } from '../../Redux/index';


function Search() {
  const products = useSelector((state: RootState) => state.products.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  // Calcula los productos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
            {currentProducts.map((card) => (
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevious}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handleClick(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNext}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Search;