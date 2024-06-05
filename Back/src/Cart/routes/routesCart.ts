import express from "express"
import { deleteCart } from "../controllers/deleteCart";
import { postCart } from "../controllers/postCart";
import { getAllCart } from "../controllers/getAllCart";
import { putCart } from "../controllers/putCart";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


router.post ('/', authenticateToken, postCart);  //todas las rutas aquí solo usuario logueado
router.get ('/', authenticateToken, getAllCart);
router.delete('/:id', authenticateToken, deleteCart);
router.put ('/:id', authenticateToken, putCart);


export default router;