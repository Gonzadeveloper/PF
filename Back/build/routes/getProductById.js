"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProductById_1 = require("../controllers/getProductById");
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
router.get('/products/:id', getProductById_1.getProductById);
exports.default = router;
