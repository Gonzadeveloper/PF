import express from "express"
import { deleteUser } from "../controllers/deleteUser";
import { postUser } from "../controllers/postUser";
import { getAllUser } from "../controllers/getAllUser";
import { putUser } from "../controllers/putUser";


const router = express.Router()


router.post ('/', postUser);
router.get ('/', getAllUser);
router.delete('/:id', deleteUser);
router.put ('/:id', putUser);


export default router;

