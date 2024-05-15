import fs from 'fs';
import path from 'path';



const dataPath = path.resolve(__dirname, '../local/product.json');

// Función para obtener todos los productos desde el archivo JSON
export function getAllProducts() {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const products = JSON.parse(jsonData);
        return products;
    } catch (error) {
        console.error('Error al leer el archivo product.json:', error);
        return [];
    }
}