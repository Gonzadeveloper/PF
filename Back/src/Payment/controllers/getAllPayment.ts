import { Request, Response } from 'express';
import { Payment } from '../../models/Payment';

const getAllPayment = async (_req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllPayment };

