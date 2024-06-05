import express from "express"
import { deleteUser } from "../controller/deleteUser";
import { postUser } from "../controller/postUser";
import { getAllUser } from "../controller/getAllUser";
import { putUser } from "../controller/putUser";
import { getUserById } from "../controller/getUserById";
import authenticateToken from "../../ProteccionRutas/middleware";
import authorizeRoles from "../../ProteccionRutas/authorizeRoles";


const router = express.Router()


router.post ('/', postUser);
router.get ('/', authorizeRoles, getAllUser); //solo para admin
router.get ('/:id', authorizeRoles, getUserById);
router.delete('/:id', authorizeRoles, deleteUser);
router.put ('/:id', authenticateToken, putUser);


export default router;

