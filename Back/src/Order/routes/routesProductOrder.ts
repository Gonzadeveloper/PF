import express from "express"
import { deleteProductOrder } from "../controllers/deleteProductOrder";
import { postProductOrder } from "../controllers/postProductOrder";
import { getAllProductOrder } from "../controllers/getAllProductOrder";
import { putProductOrder } from "../controllers/putProductOrder";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


router.post ('/', authenticateToken, postProductOrder);  //todas autenticadas éstas rutas
router.get ('/', authenticateToken, getAllProductOrder);
router.delete('/:id', authenticateToken, deleteProductOrder);
router.put ('/:id', authenticateToken, putProductOrder);


export default router;