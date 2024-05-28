import { sequelize } from '../../config/database';
import { Category } from '../../models/Category'; 
//import { Product } from '../models/Product'; 

export const getCategory = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Leer categorías
    const categories = await Category.findAll({
      attributes: ['id', 'name'] 
    });

    console.log('Operation completed successfully.');
    return categories;
  } catch (error) {
    console.error('Unable to perform operation:', error);
    return
  }
};

