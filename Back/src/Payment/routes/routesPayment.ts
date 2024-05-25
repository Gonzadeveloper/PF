import express from "express"
import { deletePayment } from "../controllers/deletePayment";
import { postPayment } from "../controllers/postPayment";
import { getAllPayment } from "../controllers/getAllPayment";
import { putPayment } from "../controllers/putPayment";


const router = express.Router()


router.post ('/', postPayment);
router.get ('/', getAllPayment);
router.delete('/:id', deletePayment);
router.put ('/:id', putPayment);


export default router;