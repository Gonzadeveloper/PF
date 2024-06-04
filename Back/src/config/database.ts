import { Sequelize } from 'sequelize-typescript';
import  pg  from "pg";
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { Address } from '../models/Address';
import { Review } from '../models/Review';
import { Order } from '../models/Order';
import { ProductOrder } from '../models/ProductOrder';
import { Payment } from '../models/Payment';
import { Cart } from '../models/Cart';
import { CartProduct } from '../models/CartProduct';

require('dotenv').config();
const { PG_URL } = process.env;

const databaseUrl = `${PG_URL}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg, 
  models: [Product, Category, User, Address, Review, Order, ProductOrder, Payment, Cart, CartProduct],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true, // Si tu base de datos requiere SSL
      rejectUnauthorized: false // Solo si tu certificado no está verificado
    }
  }
});

export { sequelize };

const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

authenticateDatabase();



// import { Sequelize } from 'sequelize-typescript';
// import { Product } from '../models/Product';
// import { Category } from '../models/Category';
// import { User } from '../models/User';
// import { Address } from '../models/Address';

// //postgres://postuser:oo3s0SfEKfGhvXY1eca7u5K9bBrxOH9p@dpg-cp6d7lgl6cac738j5660-a.oregon-postgres.render.com/electroemporium

// const sequelize = new Sequelize({
//   database: 'electroemporium',
//   dialect: 'postgres',
//   username: 'postgres',
//   password: '1234',
//   models: [Product, Category, User, Address],
// });

// export { sequelize };