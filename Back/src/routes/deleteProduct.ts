import express from 'express';
import { deleteProduct } from '../controllers/deleteProduct';

const router = express.Router();

// Ruta para eliminar un usuario
router.delete('/products/:id', deleteProduct);

export default router;