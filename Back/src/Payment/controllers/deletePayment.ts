import { Request, Response } from 'express';
import { Payment } from '../../models/Payment';

const deletePayment = async (req: Request, res: Response): Promise<void> => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    await payment.destroy(); // Realiza un borrado lógico
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deletePayment };

