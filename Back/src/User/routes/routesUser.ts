import express from "express"
import { deleteUser } from "../controller/deleteUser";
import { postUser } from "../controller/postUser";
import { getAllUser } from "../controller/getAllUser";
import { putUser } from "../controller/putUser";
import { getUserById } from "../controller/getUserById";
import { login } from '../../ProteccionRutas/controller';


const router = express.Router()


router.post ('/', login, postUser);
router.get ('/', getAllUser);
router.get ('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put ('/:id', putUser);


export default router;

