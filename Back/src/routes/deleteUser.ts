import express from 'express';
import { deleteUser } from '../controllers/deleteUser';

const router = express.Router();

// Ruta para eliminar un usuario
router.delete('/user/:id', deleteUser);

export default router;