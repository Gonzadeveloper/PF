import express from 'express';
import { putProduct } from '../controllers/putProduct';

const router = express.Router();

// Ruta para eliminar un usuario
router.put('/products/:id', putProduct);

export default router;