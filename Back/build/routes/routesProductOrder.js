"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteProductOrder_1 = require("../controllers/deleteProductOrder");
const postProductOrder_1 = require("../controllers/postProductOrder");
const getAllProductOrder_1 = require("../controllers/getAllProductOrder");
const putProductOrder_1 = require("../controllers/putProductOrder");
const router = express_1.default.Router();
router.post('/', postProductOrder_1.postProductOrder);
router.get('/', getAllProductOrder_1.getAllProductOrder);
router.delete('/:id', deleteProductOrder_1.deleteProductOrder);
router.put('/:id', putProductOrder_1.putProductOrder);
exports.default = router;
