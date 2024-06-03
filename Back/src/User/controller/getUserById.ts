import { sequelize } from '../../config/database';
import { User } from '../../models/User';
import { Address } from '../../models/Address';
import { Request, Response } from 'express';
import { Product } from '../../models/Product';

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
 //const updatedData = req.body;
 

  try {
    // Validar la entrada
    if (!userId ) {
      res.status(400).json({ message: 'ID del usuario es obligatorio' });
      return;
    }

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'password', 'typeuser'],
      include: [
        {
          model: Address,
          required: false
          // as: 'address',
          // attributes: ['address', 'country']
        },
        {
          model: Product,
          required: false
         // attributes: ['id', 'address', 'country'] // Ajusta las propiedades según tu modelo Address
        }
      ]
    }); 


    if (!user) {
      //await transaction.rollback();
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
   
    res.status(200).json({ user }); 
   
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

export { getUserById };