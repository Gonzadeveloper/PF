import express from "express"

import { deleteCategory } from "../controllers/deleteCategory";
import { postCategory } from "../controllers/postCategory";
import { getAllCategory } from "../controllers/getAllCategory";
import authorizeRoles from "../../ProteccionRutas/authorizeRoles";


const router = express.Router()


router.post ('/', authorizeRoles, postCategory); // solo admin
router.get ('/', getAllCategory); // público
router.delete('/:id', authorizeRoles, deleteCategory); // solo admin



export default router;