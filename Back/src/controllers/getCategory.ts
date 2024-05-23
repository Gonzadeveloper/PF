import { sequelize } from '../config/database';
import { Category } from '../models/Category'; 
//import { Product } from '../models/Product'; 

export const getCategory = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Leer categorías
    const categories = await Category.findAll({
      attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
    //   include: [{
    //     model: Product,
    //     attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'], // Especifica los atributos que deseas incluir de Product
    //   }],
    });

    console.log('Operation completed successfully.');
    return categories;
  } catch (error) {
    console.error('Unable to perform operation:', error);
    return
  }
};

