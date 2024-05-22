"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const User_1 = require("../models/User");
const Address_1 = require("../models/Address");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'electroemporium',
    dialect: 'postgres',
    username: 'postgres',
    password: 'basededatos',
    models: [Product_1.Product, Category_1.Category, User_1.User, Address_1.Address],
});
exports.sequelize = sequelize;
