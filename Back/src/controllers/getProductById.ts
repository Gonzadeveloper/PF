import { Request, Response } from 'express';
import * as fs from 'fs';

const productsFilePath = '../back/src/local/product.json';

export const getProductById = (req: Request, res: Response) => {
    const productIdStr = req.params.id;
    const productId = parseInt(productIdStr);

   // console.log(productId);
    

   // console.log(`Producto buscado: ${productIdStr}, ID convertido: ${productId}`);

    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error: Error reading products data' });
        }

        try {
            const products = JSON.parse(data);
             
            if (!Array.isArray(products)) {
                throw new Error('Products data is not an array');
            }
           // console.log(products);
            
            const product = products.find((p: any) => p.id === productId);

            //console.log(`Producto encontrado: ${JSON.stringify(product)}`);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            console.error('Error parsing products JSON:', error);
            return res.status(500).json({ error: 'Internal Server Error: Error parsing products data' });
        }
    });
};