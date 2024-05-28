import { Review } from '../../models/Review';

export const getReview = async () => {
  try {
    const review = await Review.findAll();
    return review;
  } catch (error) {
    throw new Error('Error al obtener las categorías');
  }
};