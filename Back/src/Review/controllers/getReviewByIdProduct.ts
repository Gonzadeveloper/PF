import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { Request, Response } from 'express';

export const getReviewByIdProduct = async (req: Request, res: Response) => {
  const productId = Number(req.params.id); // Corregir para obtener el parámetro específico de la solicitud
  try {
    const reviews = await Review.findAll({
      where: { productId },
      include: [{
        model: User
      }],
      //raw: true // Opcional: si quieres que las reseñas se devuelvan como objetos JSON simples en lugar de instancias de Review
    });
    res.json(reviews); // Enviar una respuesta HTTP con las reseñas encontradas
  } catch (error) {
    console.error('Error al obtener las reseñas:', error);
    res.status(500).send('Error al obtener las reseñas'); // Enviar una respuesta de error HTTP si ocurre un error
  }
};