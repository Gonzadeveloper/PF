import { sequelize } from '../../config/database';
import { Review } from '../../models/Review';
import { Request, Response } from 'express';

const postReview = async (req: Request, res: Response) : Promise<void> => {
  const review= req.body
  console.log(review);

  
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // Validar la entrada
    if (!review.rating || !review.comment || !review.userId || !review.productId ) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }
    
      // Crear un nuevo producto en la categoría creada
    const newReview = await Review.create({ 
      rating: review.rating, 
      comment: review.comment,
      userId: review.userId,
      productId: review.productId,
      
    } as any);
   console.log(newReview);
   
  
    console.log('CRUD operations completed successfully.');
    res.status(200).json(newReview)
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
  }
};
export { postReview };
