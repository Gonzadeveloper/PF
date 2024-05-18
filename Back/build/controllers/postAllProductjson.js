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
exports.postAllProductJson = void 0;
const database_1 = require("../config/database");
//import { Product } from '../models/Product';
//import { Category } from '../models/Category';
//import { Request, Response } from 'express';
// import { getAllProductDb } from '../controllers/getAllProductDb';
const getAllProducts_1 = require("./getAllProducts");
const postAllProductJson = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos de los productos como una cadena JSON
        const data = yield (0, getAllProducts_1.getAllProducts)();
        // Parsear los datos JSON a un array de objetos
        const products = JSON.parse(data);
        console.log(products);
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // // Recorrer y crear cada producto en la base de datos
        // for (const product of products) {
        //   await Product.create({
        //     name: product.name,
        //     description: product.description,
        //     price: product.price,
        //     stock: product.stock,
        //     condition: "NUEVO", 
        //     // Asegúrate de que tu modelo tiene este campo
        //     userId: 2,       // Asegúrate de que tu modelo tiene este campo
        //     categoryId: product.category,
        //              // Asegúrate de que tu modelo tiene este campo
        //     reviews: product.reviews      // Asegúrate de que tu modelo tiene este campo, si es aplicable
        //   });
        // }
        console.log('CRUD operations completed successfully.');
        return products;
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
        return null;
    }
});
exports.postAllProductJson = postAllProductJson;
