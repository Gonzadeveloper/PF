"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteCartProduct_1 = require("../controllers/deleteCartProduct");
const postCartProduct_1 = require("../controllers/postCartProduct");
const getAllCartProduct_1 = require("../controllers/getAllCartProduct");
const putCartProduct_1 = require("../controllers/putCartProduct");
const router = express_1.default.Router();
router.post('/', postCartProduct_1.postCartProduct);
router.get('/', getAllCartProduct_1.getAllCartProduct);
router.delete('/:id', deleteCartProduct_1.deleteCartProduct);
router.put('/:id', putCartProduct_1.putCartProduct);
exports.default = router;
