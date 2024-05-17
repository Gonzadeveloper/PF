import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, Product } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMoneyBillAlt,
  faHandHoldingUsd,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import "./Detail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id.toString() === id)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded half-height"
          />
        </div>
        <div className="col-md-6">
          <div className="card card-detail">
            <div className="card-body">
              <div className="heart-icon" /* onClick={handleAddToFavorites} */>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h1 className="mb-3">{product.name}</h1>
              <p className="text-muted mb-2">{product.category}</p>
              <p>
                <strong>Precio:</strong> ${product.price.toFixed(2)}
              </p>
              <p>
                <strong>Cantidad en Stock:</strong> {product.stock}
              </p>
              <button
                /* onClick={handleBuyNow} */ className="btn btn-primary mr-2">
                Comprar
              </button>
              <hr />
              <h2 className="mt-4">Reseñas</h2>
              <ul className="list-unstyled">
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <span className="badge">{review.rating}/5</span> -{" "}
                    {review.comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card-body">
            <h2>Descripción</h2>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Medios de Pago</h2>
              <div>
                <FontAwesomeIcon icon={faCreditCard} /> Tarjetas de Crédito
                <ul>
                  <li>Hasta 12 cuotas sin tarjeta</li>
                  <li>¡Mismo precio en cuotas con bancos seleccionados!</li>
                </ul>
              </div>
              <div>
                <FontAwesomeIcon icon={faCcVisa} /> Visa
              </div>
              <div>
                <FontAwesomeIcon icon={faCcMastercard} /> Mastercard
              </div>
              <div>
                <FontAwesomeIcon icon={faMoneyBillAlt} /> Tarjetas de Débito
              </div>
              <div>
                <FontAwesomeIcon icon={faHandHoldingUsd} /> Efectivo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
