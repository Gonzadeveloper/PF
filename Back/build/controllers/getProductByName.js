"use strict";
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
            return undefined;
        }
        const filteredProducts = productData.filter((product) => product.name.toLowerCase().includes(productName));
        if (filteredProducts.length === 0) {
            return undefined;
        }
        else {
            return filteredProducts;
        }
        // console.log(productName);
        //return filteredProducts;
    }
    catch (error) {
        console.error('Error parsing products JSON:', error);
        return undefined;
    }
    // });
};
exports.getProductByName = getProductByName;
// fs.readFile(productsFilePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return 'undefined'
//     }
