import { Request, Response } from 'express';
import { Cart } from '../../models/Cart';

const postCart = async (req: Request, res: Response): Promise<void> => {
  const cartData = req.body;

  try {
    // Validar los datos de entrada
    if (!cartData.userId) {
      res.status(400).json({ message: 'El ID del usuario es obligatorio' });
      return;
    }

    // Crear un nuevo carrito
    const newCart = await Cart.create(cartData as any);

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postCart };
