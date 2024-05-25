"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteUser_1 = require("../controller/deleteUser");
const postUser_1 = require("../controller/postUser");
const getAllUser_1 = require("../controller/getAllUser");
const putUser_1 = require("../controller/putUser");
const getUserById_1 = require("../controller/getUserById");
const router = express_1.default.Router();
router.post('/', postUser_1.postUser);
router.get('/', getAllUser_1.getAllUser);
router.get('/:id', getUserById_1.getUserById);
router.delete('/:id', deleteUser_1.deleteUser);
router.put('/:id', putUser_1.putUser);
exports.default = router;
