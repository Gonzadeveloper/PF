import { Request, Response } from 'express';
import * as fs from 'fs';

const productsFilePath = '../back/src/local/product.json';

export const getProductByName = (req: Request, res: Response) => {
    const productName = req.params.name;
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const products = JSON.parse(data);
            const filteredProducts = products.filter((product: any) =>
                product.name.toLowerCase().includes(productName.toLowerCase())
            );
            return res.json(filteredProducts);
        } catch (parseError) {
            console.error('Error parsing products JSON:', parseError);
            return res.status(500).json({ error: 'Error parsing products JSON' });
        }
    });
};