import { Request, Response } from 'express';
import { Order } from '../../models/Order';

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    await order.destroy(); // Realiza un borrado lógico
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteOrder };
