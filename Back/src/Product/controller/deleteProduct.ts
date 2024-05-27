import { Request, Response } from 'express';
import { Product } from '../../models/Product';

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const ProductId = req.params.id;

  try {
    const product = await Product.findByPk(ProductId, {paranoid: false});
    if (!product) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await product.restore(); // Esto hará un borrado lógico
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteProduct };