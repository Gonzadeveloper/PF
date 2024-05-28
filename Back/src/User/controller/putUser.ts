
import { sequelize } from '../../config/database';
import { User } from '../../models/User';
import { Address } from '../../models/Address';
import { Request, Response } from 'express';

// interface UserData {
//   name?: string;
//   email?: string;
//   password?: string;
//   typeuser?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   postalcode?: string;
//   country?: string;
// }

const putUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    // Validar la entrada
    if (!userId || !updatedData) {
      res.status(400).json({ message: 'ID del usuario y datos de actualización son obligatorios' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
      // Buscar el usuario por ID
      const user = await User.findByPk(userId, { transaction });

      if (!user) {
        await transaction.rollback();
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      // Actualizar los datos del usuario
      await user.update(updatedData, { transaction });

      // Buscar la dirección asociada al usuario
      let address = await Address.findOne({ where: { userId: user.id }, transaction });

      if (address) {
        // Actualizar los datos de la dirección
        await address.update(updatedData, { transaction });
      } else if (
        updatedData.address || updatedData.city || updatedData.state || updatedData.postalcode || updatedData.country
      ) {
        // Crear una nueva dirección si se proporcionan datos de dirección
        address = await Address.create({
          address: updatedData.address,
          city: updatedData.city,
          state: updatedData.state,
          postalcode: updatedData.postalcode,
          country: updatedData.country,
          userId: user.id,
        } as any, { transaction });
      }

      // Confirmar la transacción
      await transaction.commit();

      console.log('Usuario y dirección actualizados exitosamente:', user, address);
      res.status(200).json({ user, address }); // Responder con el usuario y la dirección actualizados
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();

      // Manejo del error
      if (error instanceof Error) {
        console.error('Unable to perform CRUD operations:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error: 'Error desconocido' });
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

export { putUser };
