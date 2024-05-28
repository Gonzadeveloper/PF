import { Request, Response } from 'express';
import { CartProduct } from '../../models/CartProduct';

const postCartProduct = async (req: Request, res: Response): Promise<void> => {
  const cartProductData = req.body;

  try {
    // Validar los datos de entrada
    if (!cartProductData.cartId || !cartProductData.productId || !cartProductData.quantity) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    // Crear un nuevo producto en el carrito
    const newCartProduct = await CartProduct.create(cartProductData as any);

    res.status(201).json(newCartProduct);
  } catch (error) {
    console.error('Error creating cart product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postCartProduct };
