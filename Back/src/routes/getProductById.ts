import express from 'express';
import { getProductById }  from '../controllers/getProductById';

const router = express.Router();

// Ruta para buscar productos por nombre
router.get('/products/:id', getProductById);

export default router;