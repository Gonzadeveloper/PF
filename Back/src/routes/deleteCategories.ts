import express from 'express';
import { deleteCategories } from 'src/controllers/deleteCategories';

const router = express.Router();

// Ruta para buscar productos por nombre
router.get('/categories/:id', deleteCategories);

export default router;