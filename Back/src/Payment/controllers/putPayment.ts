import { sequelize } from '../../config/database';
import { Payment } from '../../models/Payment';
import { Request, Response } from 'express';

const putPayment = async (req: Request, res: Response): Promise<void> => {
  const paymentId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!paymentId || !updatedData) {
      res.status(400).json({ message: 'ID del pago y datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el pago por ID
      const payment = await Payment.findByPk(paymentId);

      if (!payment) {
        res.status(404).json({ message: 'Pago no encontrado' });
        return;
      }

      // Actualizar el pago con los datos proporcionados
      await payment.update(updatedData, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      console.log('Pago actualizado exitosamente:', payment);
      res.status(200).json(payment); // Responder con el pago actualizado
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar el pago', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar el pago', error: 'Error desconocido' });
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

export { putPayment };
