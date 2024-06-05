import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMoneyBillAlt,
  faHandHoldingUsd,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import "./Detail.css";
import { getProductById } from "../../Redux/Actions/productActions";
import { setProductDetails } from "../../Redux/Slices/ProductsSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { selectSelectedProduct } from "../../Redux/Selector";
import { useParams } from "react-router-dom";
import { Review } from "../../types";

interface Props {
  productId: number;
}

const ProductDetail: React.FC<Props> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);

  useEffect(() => {
    const productId = Number(id);
    if (isNaN(productId)) {
      console.error("Invalid product ID");
      return;
    }

    dispatch(getProductById(productId));

    return () => {
      dispatch(setProductDetails(null));
    };
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="loading-container">
        <ClipLoader size={150} />
      </div>
    );
  }

  const averageRating: number | null =
    product?.review && product.review.length > 0
      ? product.review.reduce(
          (acc: number, curr: Review) => acc + curr.rating,
          0
        ) / product.review.length
      : null;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product?.image}
            alt={product?.name}
            className="img-fluid rounded half-height"
          />
        </div>
        <div className="col-md-6">
          <div className="card card-detail">
            <div className="card-body">
              <h1 className="mb-3">{product?.name}</h1>
              <p>
                <strong> Categoría:</strong>{" "}
                {product?.category?.name ?? "Sin categoría"}
              </p>
              <p>
                <strong>Precio:</strong> ${product?.price?.toFixed(2)}
              </p>
              <p>
                <strong>Cantidad en Stock:</strong> {product?.stock}
              </p>
              <p>
                <strong>Condicion:</strong> {product?.condition}
              </p>
              <button className="btn btn-primary mr-2">Comprar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card-body">
            <h2>Descripción</h2>
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mt-4">Reseñas</h2>
              <div>
                <FontAwesomeIcon icon={faStar} /> Valoración Promedio:{" "}
                {averageRating !== null ? averageRating.toFixed(1) : "N/A"}
              </div>
              {product?.review && product.review.length > 0 ? (
                <div className="reviews-container">
                  {product.review.map((review: Review) => (
                    <div className="review-item" key={review.id}>
                      <div className="review-header">
                        <div className="star-rating">
                          {[...Array(review.rating)].map((_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                          {[...Array(5 - review.rating)].map((_, index) => (
                            <span key={index + review.rating} className="star">
                              &#9734;
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews">No hay reseñas para este producto.</p>
              )}
              <hr />
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
