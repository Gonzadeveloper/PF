import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { User } from './models/User';
import { Address } from './models/Address';
import routessRaiz  from './routes/index';
import { Review } from './models/Review';
import { Order } from './models/Order';
import { ProductOrder } from './models/ProductOrder';
import { Payment } from './models/Payment';
import { Cart } from './models/Cart';
import { CartProduct } from './models/CartProduct';



const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

app.use(cors())
app.use(morgan('dev'));

app.use('/',routessRaiz)

const PORT = 3000


export const init = async () => {
    try {

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
      await sequelize.sync({ force: false });
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  init();
  
//  export { Product, Category, User, Address, Review, Order, ProductOrder, Payment, Cart, CartProduct };

