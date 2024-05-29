import { Request, Response } from 'express';
import { Cart } from '../../models/Cart';

const getAllCart = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carts = await Cart.findAll({
     //include: [{ all: true }], // Incluye todas las asociaciones
    });
    res.json(carts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllCart };
