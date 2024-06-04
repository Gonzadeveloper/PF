import { Review } from '../../models/Review';

export const getReviewByIdProduct = async (productId: number): Promise<Review[]> => {
    try {
      const reviews = await Review.findAll({
        where: { productId },
        raw: true // Opcional: si quieres que las reseñas se devuelvan como objetos JSON simples en lugar de instancias de Review
      });
      return reviews;
    } catch (error) {
      throw new Error('Error al obtener las reseñas');
    }
  };