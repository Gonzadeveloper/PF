import express from 'express';
import { crearProducto } from '../controllers/postProduct';

const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/productos', crearProducto);

export default router;