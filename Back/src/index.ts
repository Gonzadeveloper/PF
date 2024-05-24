import express from "express";
import cors from 'cors';

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
//import { getUser } from "./services/getUser";
const session = require('./Auth/config/session');
import {passport} from './Auth/config/auth';
const authRoutes = require('./Auth/config/routeAuth');



const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

app.use(cors())

app.use('/',routessRaiz)

const PORT = 3000

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const init = async () => {
    try {
      await sequelize.sync({ force: false });
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  init();
  
  export { Product, Category, User, Address, Review, Order, ProductOrder, Payment };

//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });