import { sequelize } from './config/database';
import { Product } from './models/Product';
import { Category } from './models/Category';

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