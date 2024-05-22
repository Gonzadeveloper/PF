import express from 'express';
import { putProduct } from '../controllers/putProduct'

const router = express.Router();

router.put('/products/:id', putProduct);

export default router;