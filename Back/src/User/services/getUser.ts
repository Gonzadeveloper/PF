import { Address } from '../../models/Address';
import { sequelize } from '../../config/database';
import { User } from '../../models/User';

export const getUser = async () => {  
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'); 
   
    // Leer Usuarios
    const users = await User.findAll({     
      attributes: ['id', 'name', 'email', 'password', 'typeuser'],
      include: [
        {
          model: Address,
          attributes: ['id', 'address', 'country'] // Ajusta las propiedades según tu modelo Address
        }
      ] 
    });

    console.log('CRUD operations completed successfully.');
        
    return users;
   
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
  }
  return [];
};

