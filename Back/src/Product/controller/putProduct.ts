import { sequelize } from '../../config/database';
import { Product } from '../../models/Product';
import { Request, Response } from 'express';

const putProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!productId || !updatedData) {
      res.status(400).json({ message: 'ID del producto y datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el producto por ID
      const product = await Product.findByPk(productId);

      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      // Actualizar el producto con los datos proporcionados
      await product.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Producto actualizado exitosamente:', product);
      res.status(200).json(product); // Responder con el producto actualizado
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: 'Error desconocido' });
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

export { putProduct };