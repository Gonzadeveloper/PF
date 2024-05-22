"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllCategories_1 = require("src/controllers/getAllCategories");
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
router.get('/categories', getAllCategories_1.getAllCategories);
exports.default = router;
