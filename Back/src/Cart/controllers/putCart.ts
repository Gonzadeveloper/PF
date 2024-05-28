import { sequelize } from '../../config/database';
import { Cart } from '../../models/Cart';
import { Request, Response } from 'express';

const putCart = async (req: Request, res: Response): Promise<void> => {
  const cartId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!cartId || !updatedData) {
      res.status(400).json({ message: 'ID del carrito y datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el carrito por ID
      const cart = await Cart.findByPk(cartId);

      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return;
      }

      // Actualizar el carrito con los datos proporcionados
      await cart.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Carrito actualizado exitosamente:', cart);
      res.status(200).json(cart); // Responder con el carrito actualizado
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('No se pueden realizar operaciones CRUD:', error);
        res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
      } else {
        console.error('Error desconocido:', error);
        res.status(500).json({ message: 'Error al actualizar el carrito', error: 'Error desconocido' });
      }
    }
  } catch (error) {
    // Manejo del error de conexión a la base de datos
    if (error instanceof Error) {
      console.error('Error de conexión a la base de datos:', error);
      res.status(500).json({ message: 'Error de conexión a la base de datos', error: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Error de conexión a la base de datos', error: 'Error desconocido' });
    }
  }
};

export { putCart };
