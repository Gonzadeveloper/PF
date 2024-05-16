import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(__dirname, '../local/product.json');



export function getProductByName(name: string) {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const products = JSON.parse(jsonData);
        const product = products.find((p: any) => p.name.toLowerCase().includes(name.toLowerCase()));
        return product || null;
    } catch (error) {
        console.error('Error al buscar el producto por nombre:', error);
        return null;
    }
}