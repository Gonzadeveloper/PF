import express from 'express';
//import { getCategories }  from '../controllers/getCategories';
import { postCategories } from "../controllers/postCategories";
//import { getCategories } from "../controllers/getCategories";

const router = express.Router();

// Ruta para buscar productos por nombre
//router.post('/products/product/', postProduct);
router.post('categories/categories/', postCategories);
//router.get('/products/product/', postProduct);

export default router;