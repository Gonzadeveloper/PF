import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";
import postProduct  from "./routes/postProduct";
//import  {init } from "./db";
import putProduct from "./routes/putProduct";

import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { User } from './models/User';
import { Address } from './models/Address';
import  postUser  from "./routes/postUser";
import { getAllCategories } from "./controllers/getAllCategories";
import { postCategories } from "./controllers/postCategories";
import { deleteCategories } from "./controllers/deleteCategories";

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);
app.post ('/products/product/', postProduct);
app.post ('/user/', postUser);
app.put ('/products/:id', putProduct);
app.get ('/categories', getAllCategories);
app.post ('/categories/', postCategories);
app.delete ('/categories/:id', deleteCategories);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const init = async () => {
    try {
      await sequelize.sync({ force: true });
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