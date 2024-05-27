import { sequelize } from '../../config/database';
import { CartProduct } from '../../models/CartProduct';
import { Request, Response } from 'express';

const putCartProduct = async (req: Request, res: Response): Promise<void> => {
  const cartProductId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!cartProductId || !updatedData) {
      res.status(400).json({ message: 'ID del producto en el carrito y los datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el producto en el carrito por ID
      const cartProduct = await CartProduct.findByPk(cartProductId);

      if (!cartProduct) {
        res.status(404).json({ message: 'Producto en el carrito no encontrado' });
        return;
      }

      // Actualizar el producto en el carrito con los datos proporcionados
      await cartProduct.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Producto en el carrito actualizado exitosamente:', cartProduct);
      res.status(200).json(cartProduct); // Responder con el producto en el carrito actualizado
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error: 'Error desconocido' });
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

export { putCartProduct };
