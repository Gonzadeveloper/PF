import { sequelize } from '../../config/database';
import { Order } from '../../models/Order';
import { Request, Response } from 'express';

const putOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!orderId || !updatedData) {
      res.status(400).json({ message: 'ID de la orden y datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar la orden por ID
      const order = await Order.findByPk(orderId);

      if (!order) {
        res.status(404).json({ message: 'Orden no encontrada' });
        return;
      }

      // Actualizar la orden con los datos proporcionados
      await order.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Orden actualizada exitosamente:', order);
      res.status(200).json(order); // Responder con la orden actualizada
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar la orden', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar la orden', error: 'Error desconocido' });
      }
    }
  } catch (error) {
    // Manejo del error
    if (error instanceof Error) {
      console.error('Database connection error:', error);
      res.status(500).json({ message: 'Error de conexión a la base de datos', error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'Error de conexión a la base de datos', error: 'Error desconocido' });
    }
  }
};

export { putOrder };
