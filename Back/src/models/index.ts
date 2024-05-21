import { sequelize } from '../config/database';
import { Product } from './Product';
import { Category } from './Category';
import { User } from './User';
import { Address } from './Address';

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