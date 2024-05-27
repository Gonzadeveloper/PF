import { Request, Response } from 'express';
import { ProductOrder } from '../../models/ProductOrder';

const deleteProductOrder = async (req: Request, res: Response): Promise<void> => {
  const productOrderId = req.params.id;

  try {
    const productOrder = await ProductOrder.findByPk(productOrderId);
    if (!productOrder) {
      res.status(404).json({ error: 'Product order not found' });
      return;
    }

    await productOrder.destroy(); // Realiza un borrado lógico
    res.status(200).json({ message: 'Product order deleted successfully' });
  } catch (error) {
    console.error('Error deleting product order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteProductOrder };
