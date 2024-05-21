import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";
import postProduct  from "./routes/postProduct";
import putProduct from "./routes/putProduct";

import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);
app.post ('/products/product/', postProduct);
app.put ('/products/:id', putProduct);


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
  
  export { Product, Category };