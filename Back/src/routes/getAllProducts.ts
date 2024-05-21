<<<<<<< HEAD
import { Request, Response } from 'express';
import { getAllProducts } from '../controllers/getAllProducts';
import  router  from './indexRoutes';

router.get('/products', async (_req: Request, res: Response) => {
    try {
        const products = await getAllProducts(); 
        res.status(200).json(products);
=======

import { Request, Response } from 'express';
import { getAllProducts } from '../controllers/getAllProducts';
import  router  from './indexRoutes';
import { getProductByName } from '../controllers/getProductByName';

router.get('/products', async (req: Request, res: Response) => {
    
    console.log(req.query.name);
       
    try {
        if (req.query.name) {
            const productName = req.query.name.toString();
            const productt = await getProductByName(productName);   
           // console.log(productt);
           if (!productt) {
            return res.status(404).json({ error: 'Product not found' });
           }
            return res.json(productt);
        }else{
            const products = await getAllProducts(); 
            return res.json(products);

        }
       
        
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
<<<<<<< HEAD
=======
    return res.status(500).send('Error interno del servidor');
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
});

export default router;