import { Request, Response } from 'express';
import { Order } from '../../models/Order';

const getAllOrder = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll({
       include: [{ all: true, required: false  }],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllOrder };
