import { Request, Response } from 'express';
import { Order } from '../models/Order';

const postOrder = async (req: Request, res: Response): Promise<void> => {
  const orderData = req.body;

  try {
    // Validar los datos de entrada
    if (!orderData.userId || !orderData.orderDate || !orderData.orderStatus ) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    // Crear una nueva orden
    const newOrder = await Order.create(orderData as any);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postOrder };
