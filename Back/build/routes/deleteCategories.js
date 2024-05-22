"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteCategories_1 = require("src/controllers/deleteCategories");
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
router.get('/categories/:id', deleteCategories_1.deleteCategories);
exports.default = router;
