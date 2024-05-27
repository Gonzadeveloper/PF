import { Request, Response } from 'express';

import { getProductByName } from './getProductByName';
import { getProduct } from '../services/getProduct';

const getAllProduct = async ( req: Request, res: Response) => {
  console.log(req.query.name);
       
    try {
        if (req.query.name) {
            const productName = req.query.name.toString();
            const productt = await getProductByName(productName);   
            if (!productt) {
            return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(productt);
        }else{
            const products = await getProduct();
            return res.json(products);

        }
       
        
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
    return res.status(500).send('Error interno del servidor');
};

export {getAllProduct};