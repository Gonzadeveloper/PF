import express from "express"
import { getAllProduct } from "../controllers/getAllProduct";
import { getProductById } from "../controllers/getProductById";
import { postProduct } from "../controllers/postProduct";
import { putProduct } from "../controllers/putProduct";
import { deleteProduct } from "../controllers/deleteProduct";

const router = express.Router()


router.get ('/', getAllProduct);
//router.get ('/:name', getProductByName);
router.get ('/:id', getProductById);
router.post ('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

export default router;