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
exports.getCategory = void 0;
const database_1 = require("../config/database");
const Category_1 = require("../models/Category");
//import { Product } from '../models/Product'; 
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Leer categorías
        const categories = yield Category_1.Category.findAll({
            attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
            //   include: [{
            //     model: Product,
            //     attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'], // Especifica los atributos que deseas incluir de Product
            //   }],
        });
        console.log('Operation completed successfully.');
        return categories;
    }
    catch (error) {
        console.error('Unable to perform operation:', error);
        return;
    }
});
exports.getCategory = getCategory;
