import { Request, Response } from 'express';
//import * as fs from 'fs';
//import { getAllProductDb } from '../controllers/getAllProductDb';
import { sequelize } from '../../config/database';
//import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { Order } from '@models/Order';
//const productsFilePath = '../back/src/local/product.json';

export const getOrderById = async (req: Request, res: Response) => {
    const orderIdStr = req.params.id;
    const orderId = parseInt(orderIdStr);
 
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'); 
       
        // Leer productos
        const product = await Order.findOne({
            where: {
              id: orderId // Filtra por el ID del producto
            },
            include: [{
              model: Category,
              attributes: ['id', 'name'] ,
              required: false// Especifica los atributos que deseas incluir de Category
            },
            {
              model: User,
              attributes: ['id', 'name'],
              required: false // Especifica los atributos que deseas incluir de User
            },
            {
              model: Review,
              attributes: ['rating', 'comment'],
              required: false // Especifica los atributos que deseas incluir de Review
            }],
            attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'] // Especifica los atributos que deseas incluir de Product
          });
      
          if (!product) {
            res.status(404).send(`Product with ID ${orderId} not found.`);
            
            return null;
          }
    
        console.log('CRUD operations completed successfully.');
        return res.status(200).json(product) 
      } catch (error) {
        console.error('Unable to perform CRUD operations:', error);
      }
      return 

   
};