"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const putProduct_1 = require("../controllers/putProduct");
const router = express_1.default.Router();
// Ruta para eliminar un usuario
router.put('/products/:id', putProduct_1.putProduct);
exports.default = router;
