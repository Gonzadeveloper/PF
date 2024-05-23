"use strict";
// import express from 'express';
// import { getProductByName }  from '../controllers/getProductByName';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// // Ruta para buscar productos por nombre
// router.get('/products/:name', getProductByName);
// export default router;
const express_1 = __importDefault(require("express"));
//import { getProductByName }  from '../controllers/getProductByName';
const router = express_1.default.Router();
// Ruta para buscar productos por nombre
//router.get('/products/:name', getProductByName);
exports.default = router;
