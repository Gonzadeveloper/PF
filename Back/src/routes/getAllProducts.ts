import { Request, Response } from 'express';
import { getAllProducts } from '../controllers/getAllProducts';
import  router  from './indexRoutes';

router.get('/products', async (_req: Request, res: Response) => {
    try {
        const products = await getAllProducts(); 
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

export default router;