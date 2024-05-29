import express from "express"
import { deleteCart } from "../controllers/deleteCart";
import { postCart } from "../controllers/postCart";
import { getAllCart } from "../controllers/getAllCart";
import { putCart } from "../controllers/putCart";
import { getCartById } from "../controllers/getCartById";


const router = express.Router()


router.post ('/', postCart);
router.get ('/', getAllCart);
router.delete('/:id', deleteCart);
router.put ('/:id', putCart);
router.get ('/:id', getCartById);


export default router;