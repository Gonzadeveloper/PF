import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { Address } from '../models/Address';

const sequelize = new Sequelize({
  database: 'electroemporium',
  dialect: 'postgres',
  username: 'postgres',
  password: 'tiburcio1',
  models: [Product, Category, User, Address],
});

export { sequelize };