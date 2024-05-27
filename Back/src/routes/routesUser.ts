import express from "express"
import { deleteUser } from "../controllers/deleteUser";
import { postUser } from "../controllers/postUser";
import { getAllUser } from "../controllers/getAllUser";
import { putUser } from "../controllers/putUser";
import { getUserById } from "../controllers/getUserById";


const router = express.Router()


router.post ('/', postUser);
router.get ('/', getAllUser);
router.get ('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put ('/:id', putUser);


export default router;

