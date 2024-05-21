import express from 'express';
import { getProductById }  from '../controllers/getProductById';

const router = express.Router();

// Ruta para buscar productos por nombre
router.get('/products/:id', getProductById);

<<<<<<< HEAD
export default router;

=======
export default router;
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
