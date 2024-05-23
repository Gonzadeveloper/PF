"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteCategory_1 = require("../controllers/deleteCategory");
const postCategory_1 = require("../controllers/postCategory");
const getAllCategory_1 = require("../controllers/getAllCategory");
const router = express_1.default.Router();
router.post('/', postCategory_1.postCategory);
router.get('/', getAllCategory_1.getAllCategory);
router.delete('/:id', deleteCategory_1.deleteCategory);
exports.default = router;
