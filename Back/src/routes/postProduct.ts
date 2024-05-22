import express from 'express';
//import { getProductById }  from '../controllers/getProductById';
import { postProduct } from "../controllers/postProduct";
//import { postAllProductJson } from "../controllers/postAllProductjson";

const router = express.Router();

// Ruta para buscar productos por nombre
//router.post('/products/product/', postProduct);
router.post('/products/product/', postProduct);
//router.get('/products/product/', postProduct);

export default router;