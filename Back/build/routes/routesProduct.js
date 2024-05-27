"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllProduct_1 = require("../controllers/getAllProduct");
const getProductById_1 = require("../controllers/getProductById");
const postProduct_1 = require("../controllers/postProduct");
const putProduct_1 = require("../controllers/putProduct");
const deleteProduct_1 = require("../controllers/deleteProduct");
const router = express_1.default.Router();
router.get('/', getAllProduct_1.getAllProduct);
//router.get ('/:name', getProductByName);
router.get('/:id', getProductById_1.getProductById);
router.post('/', postProduct_1.postProduct);
router.put('/:id', putProduct_1.putProduct);
router.delete('/:id', deleteProduct_1.deleteProduct);
exports.default = router;
