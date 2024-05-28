import { Request, Response } from 'express';
import { Cart } from '../../models/Cart';

const deleteCart = async (req: Request, res: Response): Promise<void> => {
  const cartId = req.params.id;

  try {
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    await cart.destroy(); // Realiza un borrado lógico
    res.status(200).json({ message: 'Carrito eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { deleteCart };
