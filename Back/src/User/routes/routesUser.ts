import express from "express"
import { deleteUser } from "../controller/deleteUser";
import { postUser } from "../controller/postUser";
import { getAllUser } from "../controller/getAllUser";
import { putUser } from "../controller/putUser";
import { getUserById } from "../controller/getUserById";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


router.post ('/', postUser);
router.get ('/', getAllUser);
router.get ('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put ('/:id', authenticateToken, putUser);


export default router;

