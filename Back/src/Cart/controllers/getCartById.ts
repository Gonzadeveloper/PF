import { Request, Response } from 'express';
import { Cart } from '../../models/Cart';

const getCartById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
  try {
    const carts = await Cart.findOne({
        where: {
            id: id // Filtra por el ID del producto
          },
     include: [{ all: true }], // Incluye todas las asociaciones
    });
    res.json(carts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getCartById };