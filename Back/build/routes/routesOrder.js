"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteOrder_1 = require("../controllers/deleteOrder");
const postOrder_1 = require("../controllers/postOrder");
const getAllOrder_1 = require("../controllers/getAllOrder");
const putOrder_1 = require("../controllers/putOrder");
const router = express_1.default.Router();
router.post('/', postOrder_1.postOrder);
router.get('/', getAllOrder_1.getAllOrder);
router.delete('/:id', deleteOrder_1.deleteOrder);
router.put('/:id', putOrder_1.putOrder);
exports.default = router;
