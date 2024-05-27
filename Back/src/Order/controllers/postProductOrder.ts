import { Request, Response } from 'express';
import { ProductOrder } from '../../models/ProductOrder';

const postProductOrder = async (req: Request, res: Response): Promise<void> => {
  const productOrderData = req.body;

  try {
    // Validar los datos de entrada
    if (!productOrderData.orderId || !productOrderData.productId || !productOrderData.quantity || !productOrderData.unitPrice) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    // Crear un nuevo producto en la orden
    const newProductOrder = await ProductOrder.create(productOrderData as any);

    res.status(201).json(newProductOrder);
  } catch (error) {
    console.error('Error creating product order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postProductOrder };
