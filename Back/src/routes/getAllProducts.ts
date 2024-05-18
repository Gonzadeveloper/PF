
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
       
        
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
    return res.status(500).send('Error interno del servidor');
});

export default router;