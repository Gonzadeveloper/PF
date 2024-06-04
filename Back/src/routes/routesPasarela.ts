import express from "express"
import {payment} from '../Pasarela de Pagos/MPConfig';

const router = express.Router();

router.post('/', payment);

export default router;
