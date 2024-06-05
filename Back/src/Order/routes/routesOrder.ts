import express from "express"
import { deleteOrder } from "../controllers/deleteOrder";
import { postOrder } from "../controllers/postOrder";
import { getAllOrder } from "../controllers/getAllOrder";
import { putOrder } from "../controllers/putOrder";
import { getOrderByUser } from '../controllers/getOrderByUser';
import { getOrderById } from "../controllers/getOrderById";
import authenticateToken from "../../ProteccionRutas/middleware"; //aquí todas autenticadas, menos esas dos con dudas

const router = express.Router()


router.post ('/', authenticateToken, postOrder);
router.get ('/', authenticateToken, getAllOrder);
router.get('/user/:idUser', getOrderByUser); //me queda duda
router.get('/:id', getOrderById); //me queda duda
router.delete('/:id', authenticateToken, deleteOrder);
router.put ('/:id', authenticateToken, putOrder);


export default router;