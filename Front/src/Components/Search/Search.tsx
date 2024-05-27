import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import NoResultsModal from "./NoResult/NoResult";
import { RootState } from "../../Redux/index";
import { setFilters } from "../../Redux/Slices/ProductsSlice";
import { addFavorite, removeFavorite } from "../../Redux/Slices/FavoritesSlice";
import { selectFilteredProducts } from "../../Redux/Selector";
import { Product } from "../../types";

function Search() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state: RootState) =>
    selectFilteredProducts(state)
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const filters = useSelector((state: RootState) => state.products.filters);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);

  useEffect(() => {
    if (filteredProducts.length === 0) {
      setShowNoResultsModal(true);
    } else {
      setShowNoResultsModal(false);
    }
  }, [filteredProducts]);

  const handleFilterChange = (name: string, value: string | number) => {
    let newValue;
    if (typeof value === "string") {
      if (value === "") {
        newValue = name.startsWith("min") ? 0 : Infinity;
      } else {
        newValue = value === "Todos" ? "Todos" : value;
      }
    } else if (typeof value === "number") {
      newValue = isNaN(value) ? (name.startsWith("min") ? 0 : Infinity) : value;
    }

    if (name === "category") {
      dispatch(
        setFilters({
          ...filters,
          category: { id: 0, name: newValue as string }, // Assuming category id is always 0
        })
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          [name]: newValue,
        })
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleFilterChange(name, value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    handleFilterChange(name, value);
  };

  const handleToggleFavorite = (product: Product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calcula los productos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

          <div className="row">
            <h3>Precio </h3>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Min"
                aria-label="Precio minimo"
                name="minPrice"
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Max"
                aria-label="Precio maximo"
                name="maxPrice"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <h3>Stock </h3>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Min"
                aria-label="Stock minimo"
                name="minStock"
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Max"
                aria-label="Stock maximo"
                name="maxStock"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h4>Condición</h4>
          <select
            className="form-select form-select-sm"
            aria-label="Small select example"
            name="condition"
            onChange={handleSelectChange}>
            <option value="Todos">Todos</option>
            <option value="NUEVO">Nuevo</option>
            <option value="USADO">Usado</option>
          </select>

          <h4>Categoria</h4>
          <select
            className="form-select form-select-sm"
            aria-label="Small select example"
            name="category"
            onChange={handleSelectChange}>
            <option value="Todos">Todos</option>
            <option value="Portatiles">Notebooks</option>
            <option value="Celulares">Celulares</option>
            <option value="Sonido">Sonido</option>
            <option value="Accesorios PC">Accesorios PC</option>
            <option value="Almacenamiento">Almacenamiento</option>
            <option value="Redes">Redes</option>
            <option value="Impresoras">Impresoras</option>
            <option value="Tabletas">Tabletas</option>
            <option value="Camaras">Camaras</option>
            <option value="Monitores">Monitores</option>
            <option value="consolas">consolas</option>
          </select>
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
                isFavorite={favorites.some((fav) => fav.id === card.id)}
                isSearchPage={true}
                onToggleFavorite={() => handleToggleFavorite(card)}
              />
            ))}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handlePrevious}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => handleClick(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}>
                <button className="page-link" onClick={handleNext}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <NoResultsModal
        show={showNoResultsModal}
        handleClose={() => setShowNoResultsModal(false)}
      />
    </div>
  );
}

export default Search;
