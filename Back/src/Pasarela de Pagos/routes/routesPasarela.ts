import express from "express"
import {payment} from '../controller/MPConfig'

const router = express.Router();

router.post('/', payment);

export default router;
