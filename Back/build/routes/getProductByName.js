"use strict";
<<<<<<< HEAD
=======
// import express from 'express';
// import { getProductByName }  from '../controllers/getProductByName';
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const express_1 = __importDefault(require("express"));
const getProductByName_1 = require("../controllers/getProductByName");
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
router.get('/products/:name', getProductByName_1.getProductByName);
=======
// const router = express.Router();
// // Ruta para buscar productos por nombre
// router.get('/products/:name', getProductByName);
// export default router;
const express_1 = __importDefault(require("express"));
//import { getProductByName }  from '../controllers/getProductByName';
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
//router.get('/products/:name', getProductByName);
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
exports.default = router;
