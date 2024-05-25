import express from "express"
import { getAllProduct } from "../controller/getAllProduct";
import { getProductById } from "../controller/getProductById";
import { postProduct } from "../controller/postProduct";
import { putProduct } from "../controller/putProduct";
import { deleteProduct } from "../controller/deleteProduct";

const router = express.Router()


router.get ('/', getAllProduct);
//router.get ('/:name', getProductByName);
router.get ('/:id', getProductById);
router.post ('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

export default router;