import express from "express"
import { deleteOrder } from "../controllers/deleteOrder";
import { postOrder } from "../controllers/postOrder";
import { getAllOrder } from "../controllers/getAllOrder";
import { putOrder } from "../controllers/putOrder";


const router = express.Router()


router.post ('/', postOrder);
router.get ('/', getAllOrder);
router.delete('/:id', deleteOrder);
router.put ('/:id', putOrder);


export default router;