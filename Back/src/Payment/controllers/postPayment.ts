import { Request, Response } from 'express';
import { Payment } from '../../models/Payment';

const postPayment = async (req: Request, res: Response): Promise<void> => {
  const paymentData = req.body;

  try {
    // Validar los datos de entrada
    if (!paymentData.orderId || !paymentData.paymentDate || !paymentData.amount || !paymentData.paymentMethod) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    // Crear un nuevo pago
    const newPayment = await Payment.create(paymentData as any);

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postPayment };
