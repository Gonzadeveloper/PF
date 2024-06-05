import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/index";
import { selectProducts } from "../../Redux/Selector";
import { Link } from "react-router-dom";
import AccesoriosPCImage from './images/Accesorios PC.jpg'
import AlmacenamientoImage from './images/Almacenamiento.jpg'
import CamarasImage from './images/Camaras.jpg'
import CelularesImage from "./images/Celulares.jpg";
import ConsolasImage from './images/consolas.jpg'
import ImpresorasImage from "./images/Impresoras.jpg";
import MonitoresImage from './images/Monitores.jpg'
import PortatilesImage from "./images/Portatiles.jpg";
import RedesImage from './images/Redes.jpg'
import RelojesImage from './images/Relojes.jpg'
import TabletasImage from './images/Tabletas.jpg'
import SonidoImage from './images/Sonido.jpg'
import './Home.css'

function Home() {
  const allProducts = useSelector((state: RootState) => selectProducts(state));
  const [randomProducts, setRandomProducts] = useState<any[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<any>({});

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const getRandomProducts = (allProducts: any[], count: number) => {
        let randomProducts = [];
        while (randomProducts.length < count) {
          const randomIndex = Math.floor(Math.random() * allProducts.length);
          if (!randomProducts.includes(allProducts[randomIndex])) {
            randomProducts.push(allProducts[randomIndex]);
          }
        }
        return randomProducts;
      };

      const randomProducts = getRandomProducts(allProducts, 5);
      setRandomProducts(randomProducts);

      const productsGroupedByCategory = allProducts.reduce(
        (acc: any, product: any) => {
          const normalizedCategoryName = product.category.name
            .toLowerCase()
            .trim();
          if (!acc[normalizedCategoryName]) {
            acc[normalizedCategoryName] = [];
          }
          acc[normalizedCategoryName].push(product);
          return acc;
        },
        {}
      );
      setProductsByCategory(productsGroupedByCategory);
    }
  }, [allProducts]);

  const categories = [
    { id: 1, name: "Celulares" },
    { id: 2, name: "Portatiles" },
    { id: 3, name: "Impresoras" },
    { id: 4, name: "Redes" },
    { id: 5, name: "Accesorios PC" },
    { id: 6, name: "Tabletas" },
    { id: 7, name: "Camaras" },
    { id: 8, name: "Sonido" },
    { id: 9, name: "Almacenamiento" },
    { id: 10, name: "Relojes Inteligentes" },
    { id: 11, name: "Monitores" },
    { id: 12, name: "Consolas" },
  ];

  return (
    <div className="container py-5">
      {randomProducts.length > 0 ? (
        <>
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-4"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              {randomProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <Link
                    to={`/products/${product.id}`}
                    className={`d-block text-decoration-none link`}>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt={product.name}
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="text-center mt-3">
                        <h5>{product.name}</h5>
                        <p>{product.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <span
                className="carousel-control-prev-icon bg-dark"
                aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <span
                className="carousel-control-next-icon bg-dark"
                aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
          <div className="textHome">
            <h1> 🔥Encontra lo que buscas 🔥</h1>
          </div>
          <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-3 mb-3">
                <div className={`card custom-card-Home`}>
                    <img
                        src={
                            category.name === 'Celulares' ? CelularesImage :
                            category.name === 'Portatiles' ? PortatilesImage :
                            category.name === 'Impresoras' ? ImpresorasImage :
                            category.name === 'Redes' ? RedesImage :
                            category.name === 'Accesorios PC' ? AccesoriosPCImage :
                            category.name === 'Tabletas' ? TabletasImage :
                            category.name === 'Camaras' ? CamarasImage :
                            category.name === 'Sonido' ? SonidoImage :
                            category.name === 'Almacenamiento' ? AlmacenamientoImage :
                            category.name === 'Relojes Inteligentes' ? RelojesImage :
                            category.name === 'Monitores' ? MonitoresImage :
                            category.name === 'Consolas' ? ConsolasImage :
                            ''
                        }
                        className="card-img-top-Home"
                        alt={category.name}
                    />
                    <div className='cardBody'>
                        <h5 className="card-title">{category.name}</h5>
                        <ul>
                            {productsByCategory[category.name.toLowerCase()]?.map((product: any) => (
                                <li key={product.id}>
                                    <Link to={`/products/${product.id}`} className='link'>
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        ))}
          </div>
        </>
      ) : (
        <div className="text-center">Cargando productos...</div>
      )}
    </div>
  );
}

export default Home;
