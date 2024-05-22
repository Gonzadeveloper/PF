import express from "express"
import cors from 'cors';

import getAllProducts  from './routes/getAllProducts' ;
import  getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";
import postProduct  from "./routes/postProduct";
//import  {init } from "./db";

import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { User } from './models/User';
import { Address } from './models/Address';
import  postUser  from "./routes/postUser";
import  getUser  from "./routes/getUser";
import deleteUser from "./routes/deleteUser";
import deleteProduct from "./routes/deleteProduct";
import putProduct  from "./routes/putProduct";
//import { getUser } from "./services/getUser";




const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

app.use(cors())

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);
app.post ('/products/product/', postProduct);
app.post ('/user/', postUser);
app.get ('/user/', getUser);
app.delete('/user/:id', deleteUser);
app.delete('/products/:id', deleteProduct);
app.put('/products/:id', putProduct);

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
  
  export { Product, Category, User, Address };

//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });