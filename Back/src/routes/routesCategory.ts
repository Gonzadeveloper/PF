import express from "express"

import { deleteCategory } from "../controllers/deleteCategory";
import { postCategory } from "../controllers/postCategory";
import { getAllCategory } from "../controllers/getAllCategory";



const router = express.Router()


router.post ('/', postCategory);
router.get ('/', getAllCategory);
router.delete('/:id', deleteCategory);



export default router;