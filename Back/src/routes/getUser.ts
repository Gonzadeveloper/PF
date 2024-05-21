import express from 'express';
import { getAllUser } from '../controllers/getAllUser';


const router = express.Router();

// Ruta para buscar productos por nombre
//router.post('/products/product/', postProduct);
router.get('/User/', getAllUser);
//router.get('/products/product/', postProduct);

export default router;