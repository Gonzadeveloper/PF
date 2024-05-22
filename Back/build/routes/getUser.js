"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllUser_1 = require("../controllers/getAllUser");
const router = express_1.default.Router();
router.get('/User/', getAllUser_1.getAllUser);
//router.get('/products/product/', postProduct);
exports.default = router;
