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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { getAllProducts } from '../controllers/getAllProducts';
const indexRoutes_1 = __importDefault(require("./indexRoutes"));
const getProductByName_1 = require("../controllers/getProductByName");
//import { getProductByName } from '../controllers/getProductByName';
const getAllProductDb_1 = require("../controllers/getAllProductDb");
indexRoutes_1.default.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.name);
    try {
        if (req.query.name) {
            const productName = req.query.name.toString();
            const productt = yield (0, getProductByName_1.getProductByName)(productName);
            // console.log(productt);
            if (!productt) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(productt);
        }
        else {
            const products = yield (0, getAllProductDb_1.getAllProductDb)();
            return res.json(products);
        }
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
    return res.status(500).send('Error interno del servidor');
}));
exports.default = indexRoutes_1.default;
