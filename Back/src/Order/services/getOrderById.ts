//import {Response } from 'express';
//import * as fs from 'fs';
//import { getAllProductDb } from '../controllers/getAllProductDb';
import { sequelize } from '../../config/database';
import { Order } from '../../models/Order';
import { ProductOrder } from '../../models/ProductOrder';

export const getOrderById = async (orderId: number) => {
   try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Buscar la orden por ID
    const order = await Order.findOne({
      where: {
        id: orderId
      },
      include: [
        {
          model: ProductOrder,
          required: false
         // attributes: ['id', 'address', 'country'] // Ajusta las propiedades según tu modelo Address
        },
    ]
    });

    if (!order) {
      //return send(`Order with ID ${orderrId} not found.`);
    }

    
    return order
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
    return
  }
};