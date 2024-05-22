import express from 'express';
import { getAllCategories } from 'src/controllers/getAllCategories';

const router = express.Router();

// Ruta para buscar productos por nombre
router.get('/categories', getAllCategories);

export default router;