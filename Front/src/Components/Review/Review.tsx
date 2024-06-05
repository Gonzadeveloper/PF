import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

interface ReviewProps {}

const Review: React.FC<ReviewProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const userId = useSelector((state: any) => state.user.user.id);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        if (!productId) {
          console.error("El productId es null.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    getProductDetails();
  }, [productId]);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productId) {
      console.error("No se ha especificado un productId válido.");
      return;
    }

    const reviewData = {
      rating,
      comment,
      userId,
      productId,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/review/",
        reviewData
      );

      console.log("Respuesta del servidor:", response.data);

      if (response.status !== 200) {
        throw new Error(`Error al enviar la reseña: ${response.statusText}`);
      }

      setRating(0);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  const renderStars = (value: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleRatingChange(i)}>
          {value >= i ? <FaStar color="#ffc107" /> : <FaStar color="#e4e5e9" />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container mt-5">
      <div
        className="card mb-4 mx-auto"
        style={{ width: "90%", maxWidth: "800px" }}>
        {product && (
          <div className="row g-0 align-items-center">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted mb-1">
                  Descripción: {product.description}
                </p>
                <p className="text-muted">Precio: {product.price}</p>
                <h6 className="mt-4">Reseñas</h6>
                {product.review &&
                  product.review.map((review: any, index: number) => (
                    <div key={index}>
                      <p>{review.comment}</p>
                      <p>{renderStars(review.rating)}</p>
                      <p>{review.user.name}</p>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-md-3">
              <img
                src={product.image}
                alt="product"
                className="img-fluid"
                style={{ height: "150px", objectFit: "cover", width: "100%" }}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className="card mb-4 mx-auto"
        style={{ width: "90%", maxWidth: "800px" }}>
        <div className="card-body">
          <h2>Deja una reseña</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="rating">Rating:</label>
              <div>{renderStars(rating)}</div>
            </div>
            <div>
              <label htmlFor="comment">Comentario:</label>
              <textarea
                id="comment"
                className="form-control"
                value={comment}
                onChange={handleCommentChange}
                rows={4}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar reseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
