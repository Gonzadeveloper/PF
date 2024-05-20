"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProductByName_1 = require("../controllers/getProductByName");
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
router.get('/products/:name', getProductByName_1.getProductByName);
exports.default = router;
