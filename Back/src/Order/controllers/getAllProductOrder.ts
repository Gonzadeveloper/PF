import { Request, Response } from 'express';
import { ProductOrder } from '../../models/ProductOrder';

const getAllProductOrder = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productOrders = await ProductOrder.findAll();
    res.json(productOrders);
  } catch (error) {
    console.error('Error fetching product orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllProductOrder };
