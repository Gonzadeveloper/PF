import { sequelize } from '../config/database';
//import { Product } from '../models/Product';
//import { Category } from '../models/Category';
//import { Request, Response } from 'express';
// import { getAllProductDb } from '../controllers/getAllProductDb';
import { getAllProducts } from './getAllProducts';

interface Review {
  // Define aquí las propiedades de una reseña si las conoces
  rating: number;
  comment: string;
}

interface ProductType {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  image: string;
  reviews: Review[];
  
}

const postAllProductJson = async (): Promise<ProductType[] | null> => {
  try {
    // Obtener los datos de los productos como una cadena JSON
    const data = await getAllProducts();

    // Parsear los datos JSON a un array de objetos
    const products: ProductType[] = JSON.parse(data);
    console.log(products);

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // // Recorrer y crear cada producto en la base de datos
    // for (const product of products) {
    //   await Product.create({
    //     name: product.name,
    //     description: product.description,
    //     price: product.price,
    //     stock: product.stock,
    //     condition: "NUEVO", 
    //     // Asegúrate de que tu modelo tiene este campo
    //     userId: 2,       // Asegúrate de que tu modelo tiene este campo
    //     categoryId: product.category,
    //              // Asegúrate de que tu modelo tiene este campo
    //     reviews: product.reviews      // Asegúrate de que tu modelo tiene este campo, si es aplicable
    //   });
    // }

    console.log('CRUD operations completed successfully.');
    return products;
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
    return null;
  }
};

export { postAllProductJson };