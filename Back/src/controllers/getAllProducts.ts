import fs from 'fs';
import path from 'path';



const dataPath = path.resolve(__dirname, '../local/product.json');

if (!fs.existsSync(dataPath)) {
    console.error(`El archivo ${dataPath} no existe.`);
    // Maneja el error adecuadamente, por ejemplo, lanzando una excepción o enviando una respuesta al cliente.
}

export const getAllProducts = async () => {
    
    try {
        const data = await fs.promises.readFile(dataPath, 'utf8');
        const productData = JSON.parse(data);
        return productData;
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        throw new Error('Error al leer el archivo'); 
    }
};