"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexRoutes_1 = __importDefault(require("./indexRoutes"));
const getProductByName_1 = require("../controllers/getProductByName");
indexRoutes_1.default.get('/products/:name', (req, res) => {
    const productName = req.params.name;
    try {
        const product = (0, getProductByName_1.getProductByName)(productName);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: `Producto "${productName}" no encontrado.` });
        }
    }
    catch (error) {
        console.error('Error al obtener el producto por nombre:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});
exports.default = indexRoutes_1.default;
