import express from "express"
import { deleteCartProduct } from "../controllers/deleteCartProduct";
import { postCartProduct } from "../controllers/postCartProduct";
import { getAllCartProduct } from "../controllers/getAllCartProduct";
import { putCartProduct } from "../controllers/putCartProduct";


const router = express.Router()


router.post ('/', postCartProduct);
router.get ('/', getAllCartProduct);
router.delete('/:id', deleteCartProduct);
router.put ('/:id', putCartProduct);


export default router;