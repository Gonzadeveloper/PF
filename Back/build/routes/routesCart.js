"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteCart_1 = require("../controllers/deleteCart");
const postCart_1 = require("../controllers/postCart");
const getAllCart_1 = require("../controllers/getAllCart");
const putCart_1 = require("../controllers/putCart");
const router = express_1.default.Router();
router.post('/', postCart_1.postCart);
router.get('/', getAllCart_1.getAllCart);
router.delete('/:id', deleteCart_1.deleteCart);
router.put('/:id', putCart_1.putCart);
exports.default = router;
