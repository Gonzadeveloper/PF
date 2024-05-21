"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataPath = path_1.default.resolve(__dirname, '../local/product.json');
if (!fs_1.default.existsSync(dataPath)) {
    console.error(`El archivo ${dataPath} no existe.`);
    // Maneja el error adecuadamente, por ejemplo, lanzando una excepción o enviando una respuesta al cliente.
}
const getAllProducts = async () => {
    try {
        const data = await fs_1.default.promises.readFile(dataPath, 'utf8');
        const productData = JSON.parse(data);
        return productData;
    }
    catch (err) {
        console.error('Error al leer el archivo:', err);
        throw new Error('Error al leer el archivo');
    }
};
exports.getAllProducts = getAllProducts;
