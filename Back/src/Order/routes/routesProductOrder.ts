import express from "express"
import { deleteProductOrder } from "../controllers/deleteProductOrder";
import { postProductOrder } from "../controllers/postProductOrder";
import { getAllProductOrder } from "../controllers/getAllProductOrder";
import { putProductOrder } from "../controllers/putProductOrder";


const router = express.Router()


router.post ('/', postProductOrder);
router.get ('/', getAllProductOrder);
router.delete('/:id', deleteProductOrder);
router.put ('/:id', putProductOrder);


export default router;