import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

interface ReviewProps {
  productId: number;
}

const Review: React.FC<ReviewProps> = ({ productId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const userId = useSelector((state: any) => state.user.user.id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit llamado");

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

    console.log("Datos de reseña:", reviewData);

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
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  return (
    <div>
      <h2>Deja una reseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div>
          <label htmlFor="comment">Comentario:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}></textarea>
        </div>
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default Review;
