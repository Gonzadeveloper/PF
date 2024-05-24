"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const User_1 = require("../models/User");
const Address_1 = require("../models/Address");
const Review_1 = require("../models/Review");
const Order_1 = require("../models/Order");
const ProductOrder_1 = require("../models/ProductOrder");
const Payment_1 = require("../models/Payment");
require("dotenv").config();
const { PG_URL } = process.env;
const databaseUrl = `${PG_URL}`;
const sequelize = new sequelize_typescript_1.Sequelize(databaseUrl, {
  dialect: "postgres",
  models: [
    Product_1.Product,
    Category_1.Category,
    User_1.User,
    Address_1.Address,
    Review_1.Review,
    Order_1.Order,
    ProductOrder_1.ProductOrder,
    Payment_1.Payment,
  ],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true, // Si tu base de datos requiere SSL
      rejectUnauthorized: false, // Solo si tu certificado no está verificado
    },
  },
});
exports.sequelize = sequelize;
const authenticateDatabase = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
authenticateDatabase();
// import { Sequelize } from 'sequelize-typescript';
// import { Product } from '../models/Product';
// import { Category } from '../models/Category';
// import { User } from '../models/User';
// import { Address } from '../models/Address';
// //postgres://postuser:oo3s0SfEKfGhvXY1eca7u5K9bBrxOH9p@dpg-cp6d7lgl6cac738j5660-a.oregon-postgres.render.com/electroemporium
// const sequelize = new Sequelize({
//   database: 'electroemporium',
//   dialect: 'postgres',
//   username: 'postgres',
//   password: '1234',
//   models: [Product, Category, User, Address],
// });
// export { sequelize };
