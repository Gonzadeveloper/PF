import express from 'express';
import { getAllUser } from '../controllers/getAllUser';


const router = express.Router();

router.get('/User/', getAllUser);
//router.get('/products/product/', postProduct);

export default router;