"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { getAllProducts } from '../controllers/getAllProducts';
const indexRoutes_1 = __importDefault(require("./indexRoutes"));
const getProductByName_1 = require("../controllers/getProductByName");
<<<<<<< HEAD
indexRoutes_1.default.get('/products', async (req, res) => {
=======
//import { getProductByName } from '../controllers/getProductByName';
const getAllProductDb_1 = require("../controllers/getAllProductDb");
indexRoutes_1.default.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
>>>>>>> 813319aa93483857abc613aee470c874d90cc2e6
    console.log(req.query.name);
    try {
        if (req.query.name) {
            const productName = req.query.name.toString();
            const productt = await (0, getProductByName_1.getProductByName)(productName);
            // console.log(productt);
            if (!productt) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(productt);
        }
        else {
<<<<<<< HEAD
            const products = await (0, getAllProducts_1.getAllProducts)();
=======
            const products = yield (0, getAllProductDb_1.getAllProductDb)();
>>>>>>> 813319aa93483857abc613aee470c874d90cc2e6
            return res.json(products);
        }
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
    return res.status(500).send('Error interno del servidor');
});
exports.default = indexRoutes_1.default;
