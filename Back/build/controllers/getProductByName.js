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
exports.getProductByName = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const sequelize_1 = require("sequelize");
const getProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Leer productos
        const product = yield Product_1.Product.findOne({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: `%${name}%` // Utiliza el operador iLike para búsqueda insensible a mayúsculas y minúsculas en PostgreSQL
                }
            },
            include: [{
                    model: Category_1.Category,
                    attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
                }],
            attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'] // Especifica los atributos que deseas incluir de Product
        });
        if (!product) {
            console.log(`Product with name ${name} not found.`);
            return undefined;
        }
        console.log('CRUD operations completed successfully.');
        return product;
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
    }
    return;
});
exports.getProductByName = getProductByName;
