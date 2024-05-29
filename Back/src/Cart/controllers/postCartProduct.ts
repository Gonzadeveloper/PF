import { Request, Response } from 'express';
import { CartProduct } from '../../models/CartProduct';

const postCartProduct = async (req: Request, res: Response): Promise<void> => {
  const { products } = req.body;

  // Validar los datos de entrada manualmente
  if (!Array.isArray(products)) {
    res.status(400).json({ message: 'El campo products debe ser una lista de productos' });
    return;
  }

  for (const product of products) {
    if (!product.cartId || !product.productId || !Number.isInteger(product.quantity) || product.quantity <= 0) {
      res.status(400).json({ message: 'Cada producto debe tener cartId, productId y quantity debe ser un entero positivo' });
      return;
    }
  }

  try {
    // Crear nuevos productos en el carrito
    const newCartProducts = await Promise.all(
      products.map((product) => CartProduct.create(product))
    );

    res.status(201).json(newCartProducts);
  } catch (error) {
    console.error('Error creating cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postCartProduct };