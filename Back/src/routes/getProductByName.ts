import express, { Request, Response } from 'express';
import router from './indexRoutes';
import {getProductByName} from '../controllers/getProductByName';

router.get('/products/:name', (req: Request, res: Response) => {
    const productName = req.params.name;
    try {
        const product = getProductByName(productName);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Producto "${productName}" no encontrado.` });
        }
    } catch (error) {
        console.error('Error al obtener el producto por nombre:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

export default router;


