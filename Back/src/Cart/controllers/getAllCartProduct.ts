import { Request, Response } from 'express';
import { CartProduct } from '../../models/CartProduct';

const getAllCartProduct = async (_req: Request, res: Response): Promise<void> => {
  try {
    //const cartProducts = await CartProduct.findAll();
    const cartProducts = await CartProduct.findAll({
      include: [{ all: true }], // Incluye todas las asociaciones
    });



    res.json(cartProducts);
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllCartProduct };
