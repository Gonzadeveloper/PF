import { Request, Response } from 'express';
import { Review } from '../../models/Review';

const deleteReview = async (req: Request, res: Response): Promise<void> => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await review.destroy(); // Esto hará un borrado lógico
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting Review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteReview };