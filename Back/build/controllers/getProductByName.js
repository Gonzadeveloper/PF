"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByName = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataPath = path_1.default.resolve(__dirname, '../local/product.json');
function getProductByName(name) {
    try {
        const jsonData = fs_1.default.readFileSync(dataPath, 'utf-8');
        const products = JSON.parse(jsonData);
        const product = products.find((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        return product || null;
    }
    catch (error) {
        console.error('Error al buscar el producto por nombre:', error);
        return null;
    }
}
exports.getProductByName = getProductByName;
