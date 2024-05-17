//import { Request, Response } from 'express';
import * as fs from 'fs';

const productsFilePath = '../back/src/local/product.json';

export const getProductByName1 = async (name: string) => {
    //const productName = req.params.name;
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            return  console.error(err);
            
        }
        const productName = name;
        console.log(productName);

        try {
            const productss = JSON.parse(data);
            //console.log(productss);
            
            const filteredProducts = productss.filter((product: any) =>
                product.name.toLowerCase().includes(productName.toLowerCase())
            );
            
            console.log(filteredProducts);
           // const productFiltered = JSON.parse(filteredProducts);     
            //return JSON.parse(filteredProducts);  

           return filteredProducts;
        } catch (parseError) {
            console.error('Error parsing products JSON:', parseError);
            return 'undefined'
        }
        
    });
};