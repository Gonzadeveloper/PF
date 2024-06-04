import 'reflect-metadata';
import { sequelize } from './config/database';
import dotenv from 'dotenv';
import app from './app';
dotenv.config();


//const app = express();
const port = process.env.PORT || 3000;



sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});






// const init = async () => {
//     try {
//       await sequelize.sync({ force: false });
//       console.log('Database & tables created!');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   };
  
//   init();
  
 // export { Product, Category, User, Address, Review, Order, ProductOrder, Payment, Cart, CartProduct };

