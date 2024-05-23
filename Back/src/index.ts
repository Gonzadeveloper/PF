import express from "express"
import cors from 'cors';

import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { User } from './models/User';
import { Address } from './models/Address';
//import { getUser } from "./services/getUser";
import routessRaiz from './routes/index';


const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

app.use(cors())

const PORT = 3000

app.use('/', routessRaiz);

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