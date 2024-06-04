import { Request, Response } from 'express';
import { Review } from '../../models/Review';

// Función para obtener el promedio de reviews de un producto
export const getProductReviewAverage = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.findAll({
      where: { productId: productId, deletedAt: null },
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    res.status(200).json({ averageRating: averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating average rating', error });
  }
  return;
};

// Función para obtener el promedio de reviews de un usuario
export const getUserReviewAverage = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.findAll({
      where: { userId: userId, deletedAt: null },
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user' });
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    res.status(200).json({ averageRating: averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating average rating', error });
  }
  return; 
};
