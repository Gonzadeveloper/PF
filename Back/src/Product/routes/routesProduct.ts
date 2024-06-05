import express from "express"
import { getAllProduct } from "../controller/getAllProduct";
import { getProductById } from "../controller/getProductById";
import { postProduct } from "../controller/postProduct";
import { putProduct } from "../controller/putProduct";
import { deleteProduct } from "../controller/deleteProduct";
import authenticateToken from "../../ProteccionRutas/middleware";

const router = express.Router()


router.get ('/', getAllProduct); //público
//router.get ('/:name', getProductByName);
router.get ('/:id', getProductById); //en ésta tengo dudas
router.post ('/', authenticateToken, postProduct); //auth y todos los de abajo tamb
router.put('/:id', authenticateToken, putProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;