import { sequelize } from '../../config/database';
import { ProductOrder } from '../../models/ProductOrder';
import { Request, Response } from 'express';

const putProductOrder = async (req: Request, res: Response): Promise<void> => {
  const productOrderId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!productOrderId || !updatedData) {
      res.status(400).json({ message: 'ID del pedido del producto y los datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el pedido del producto por ID
      const productOrder = await ProductOrder.findByPk(productOrderId);

      if (!productOrder) {
        res.status(404).json({ message: 'Pedido del producto no encontrado' });
        return;
      }

      // Actualizar el pedido del producto con los datos proporcionados
      await productOrder.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Pedido del producto actualizado exitosamente:', productOrder);
      res.status(200).json(productOrder); // Responder con el pedido del producto actualizado
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar el pedido del producto', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar el pedido del producto', error: 'Error desconocido' });
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

export { putProductOrder };
