import { Request, Response } from 'express';
import { CartProduct } from '../../models/CartProduct';

const deleteCartProduct = async (req: Request, res: Response): Promise<void> => {
  const cartProductId = req.params.id;

  try {
    const cartProduct = await CartProduct.findByPk(cartProductId);
    if (!cartProduct) {
      res.status(404).json({ error: 'Product in cart not found' });
      return;
    }

    await cartProduct.destroy(); // Realiza un borrado lógico
    res.status(200).json({ message: 'Product in cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting product in cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteCartProduct };
