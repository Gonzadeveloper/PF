<<<<<<< HEAD
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
=======
//import { Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';

interface Product {
    name: string;
    // Otras propiedades de un producto
}

const dataPath = path.resolve(__dirname, '../local/product.json');

if (!fs.existsSync(dataPath)) {
    console.error(`El archivo ${dataPath} no existe.`);
    // Maneja el error adecuadamente, por ejemplo, lanzando una excepción o enviando una respuesta al cliente.
}

export const getProductByName = async(name: string): Promise<Product[] | undefined> => {
    const productName = name.toLowerCase();
    //console.log(productName);
   
        try {
            const data = await fs.promises.readFile(dataPath, 'utf8');
            const productData = JSON.parse(data);
            
           if (!Array.isArray(productData)) {
            console.error('El archivo JSON no contiene una lista de productos válida.');
            return undefined;
        } 

            const filteredProducts = productData.filter((product: Product) =>
                product.name.toLowerCase().includes(productName)
            
            
            );

            if (filteredProducts.length === 0) {
                return undefined;
            } else {
                return filteredProducts; 
            }
           // console.log(productName);
            //return filteredProducts;
        } catch (error) {
            console.error('Error parsing products JSON:', error);
            return undefined
        }
   // });
};
 
    // fs.readFile(productsFilePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return 'undefined'
    //     }
         
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
