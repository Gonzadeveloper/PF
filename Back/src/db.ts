import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { User } from './models/User';
import { Address } from './models/Address';

const init = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

init();

export { init, Product, Category, User, Address };