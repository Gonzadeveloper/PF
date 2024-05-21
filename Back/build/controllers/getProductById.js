"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
//import * as fs from 'fs';
//import { getAllProductDb } from '../controllers/getAllProductDb';
const database_1 = require("../config/database");
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const User_1 = require("../models/User");
//const productsFilePath = '../back/src/local/product.json';
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productIdStr = req.params.id;
    const productId = parseInt(productIdStr);
    try {
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Leer productos
        const product = yield Product_1.Product.findOne({
            where: {
                id: productId // Filtra por el ID del producto
            },
            include: [{
                    model: Category_1.Category,
                    attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
                },
                {
                    model: User_1.User,
                    attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de User
                }],
            attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'] // Especifica los atributos que deseas incluir de Product
        });
        if (!product) {
            res.status(404).send(`Product with ID ${productId} not found.`);
            return null;
        }
        console.log('CRUD operations completed successfully.');
        return res.status(200).json(product);
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
    }
    return;
});
exports.getProductById = getProductById;
