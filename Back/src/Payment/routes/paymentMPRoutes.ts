import express from 'express';
import { payment, handlePaymentSuccess, handleNotifications} from '../controllers/paymentMP';
//import authenticateToken from '../../ProteccionRutas/middleware';

const router = express();


router.post('/crear-orden', payment);
router.get('/success', handlePaymentSuccess);
router.get('/failure', (_req, res) => res.send('Pago fallido.'));
router.get('/pending', (_req, res) => res.send('Pago pendiente.'));
router.post('/notifications', handleNotifications);

export default router;  