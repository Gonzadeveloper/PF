import { sequelize } from '../config/database';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
//import { Request, Response } from 'express';

const getAllProductDb = async ()  => {  
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'); 
   
    // Leer productos
     const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
      },
      {
        model: User,
        attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de User
      }],
      attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'] // Especifica los atributos que deseas incluir de Product
    });

    console.log('CRUD operations completed successfully.');
    return products
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
  }
  return 
};
export { getAllProductDb };
