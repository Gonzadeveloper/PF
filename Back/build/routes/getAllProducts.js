"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllProducts_1 = require("../controllers/getAllProducts");
const indexRoutes_1 = __importDefault(require("./indexRoutes"));
indexRoutes_1.default.get('/products', async (_req, res) => {
    try {
        const products = await (0, getAllProducts_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});
exports.default = indexRoutes_1.default;
