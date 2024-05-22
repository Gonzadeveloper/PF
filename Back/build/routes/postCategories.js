"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { getCategories }  from '../controllers/getCategories';
const postCategories_1 = require("../controllers/postCategories");
//import { getCategories } from "../controllers/getCategories";
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
//router.post('/products/product/', postProduct);
router.post('categories/categories/', postCategories_1.postCategories);
//router.get('/products/product/', postProduct);
exports.default = router;
