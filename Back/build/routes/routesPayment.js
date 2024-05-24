"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deletePayment_1 = require("../controllers/deletePayment");
const postPayment_1 = require("../controllers/postPayment");
const getAllPayment_1 = require("../controllers/getAllPayment");
const putPayment_1 = require("../controllers/putPayment");
const router = express_1.default.Router();
router.post('/', postPayment_1.postPayment);
router.get('/', getAllPayment_1.getAllPayment);
router.delete('/:id', deletePayment_1.deletePayment);
router.put('/:id', putPayment_1.putPayment);
exports.default = router;
