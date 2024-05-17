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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
const fs = __importStar(require("fs"));
const productsFilePath = '../back/src/local/product.json';
const getProductById = (req, res) => {
    const productIdStr = req.params.id;
    const productId = parseInt(productIdStr);
    // console.log(productId);
    // console.log(`Producto buscado: ${productIdStr}, ID convertido: ${productId}`);
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error: Error reading products data' });
        }
        try {
            const products = JSON.parse(data);
            if (!Array.isArray(products)) {
                throw new Error('Products data is not an array');
            }
            // console.log(products);
            const product = products.find((p) => p.id === productId);
            //console.log(`Producto encontrado: ${JSON.stringify(product)}`);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(product);
        }
        catch (error) {
            console.error('Error parsing products JSON:', error);
            return res.status(500).json({ error: 'Internal Server Error: Error parsing products data' });
        }
    });
};
exports.getProductById = getProductById;
