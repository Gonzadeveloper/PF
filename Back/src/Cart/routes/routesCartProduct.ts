import express from "express"
import { deleteCartProduct } from "../controllers/deleteCartProduct";
import { postCartProduct } from "../controllers/postCartProduct";
import { getAllCartProduct } from "../controllers/getAllCartProduct";
import { putCartProduct } from "../controllers/putCartProduct";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


router.post ('/', authenticateToken, postCartProduct); //todas las rutas aquí solo usuario logueado
router.get ('/', authenticateToken, getAllCartProduct);
router.delete('/:id', authenticateToken, deleteCartProduct);
router.put ('/:id', authenticateToken, putCartProduct);


export default router;