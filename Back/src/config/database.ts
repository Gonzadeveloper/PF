import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

const sequelize = new Sequelize({
  database: 'electroemporium',
  dialect: 'postgres',
  username: 'postgres',
  password: 'tiburcio1',
  models: [Product, Category],
});

export { sequelize };