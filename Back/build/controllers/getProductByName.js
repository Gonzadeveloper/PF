"use strict";
<<<<<<< HEAD
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByName = void 0;
//import { Request, Response } from 'express';
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const dataPath = path_1.default.resolve(__dirname, '../local/product.json');
if (!fs.existsSync(dataPath)) {
    console.error(`El archivo ${dataPath} no existe.`);
    // Maneja el error adecuadamente, por ejemplo, lanzando una excepción o enviando una respuesta al cliente.
}
const getProductByName = async (name) => {
    const productName = name.toLowerCase();
    //console.log(productName);
    try {
        const data = await fs.promises.readFile(dataPath, 'utf8');
        const productData = JSON.parse(data);
        if (!Array.isArray(productData)) {
            console.error('El archivo JSON no contiene una lista de productos válida.');
=======
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
>>>>>>> 813319aa93483857abc613aee470c874d90cc2e6
            return undefined;
        }
        console.log('CRUD operations completed successfully.');
        return product;
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
    }
<<<<<<< HEAD
    // });
};
=======
    return;
});
>>>>>>> 813319aa93483857abc613aee470c874d90cc2e6
exports.getProductByName = getProductByName;
