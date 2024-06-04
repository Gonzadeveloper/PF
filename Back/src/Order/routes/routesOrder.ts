import express from "express"
import { deleteOrder } from "../controllers/deleteOrder";
import { postOrder } from "../controllers/postOrder";
import { getAllOrder } from "../controllers/getAllOrder";
import { putOrder } from "../controllers/putOrder";
import { getOrderByUser } from '../controllers/getOrderByUser';

const router = express.Router()


router.post ('/', postOrder);
router.get ('/', getAllOrder);
router.get('/user/:idUser', getOrderByUser);
router.delete('/:id', deleteOrder);
router.put ('/:id', putOrder);


export default router;