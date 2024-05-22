"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { getProductById }  from '../controllers/getProductById';
const postUser_1 = require("../controllers/postUser");
//import { postAllProductJson } from "../controllers/postAllProductjson";
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
//router.post('/products/product/', postProduct);
router.post('/User/', postUser_1.postUser);
//router.get('/products/product/', postProduct);
exports.default = router;
