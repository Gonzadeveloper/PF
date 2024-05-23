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
exports.postProduct = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../models/Product");
//import { getAllProductDb } from '../controllers/getAllProductDb';
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    console.log(product);
    try {
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Validar la entrada
        if (!product.name || !product.description || !product.price || !product.stock || !product.condition || !product.image || !product.userId || !product.categoryId) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Crear una nueva categoría
        // const newCategory = await Category.create({ name: 'Tecnologia' } as any);
        // Crear un nuevo producto en la categoría creada
        const newProduct = yield Product_1.Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            condition: product.condition,
            image: product.image,
            userId: product.userId,
            categoryId: product.categoryId,
            //categoryId: newCategory.id,
        });
        console.log(newProduct);
        //console.log(newCategory);
        console.log('CRUD operations completed successfully.');
        res.status(200).json(product);
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
    }
});
exports.postProduct = postProduct;
