import express from "express"
import { deletePayment } from "../controllers/deletePayment";
import { postPayment } from "../controllers/postPayment";
import { getAllPayment } from "../controllers/getAllPayment";
import { putPayment } from "../controllers/putPayment";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


router.post ('/', authenticateToken, postPayment); //todas las rutas aquí usuario logueado
router.get ('/', authenticateToken, getAllPayment);
router.delete('/:id', authenticateToken, deletePayment);
router.put ('/:id', authenticateToken, putPayment);


export default router;