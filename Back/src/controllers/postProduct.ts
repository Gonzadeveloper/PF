import { sequelize } from '../config/database';
import { Product } from '../models/Product';
//import { Category } from '../models/Category';
import { Request, Response } from 'express';
//import { getAllProductDb } from '../controllers/getAllProductDb';

const postProduct = async (req: Request, res: Response) : Promise<void> => {
  const product= req.body
  console.log(product);

  
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // Validar la entrada
    if (!product.name || !product.description || !product.price || !product.stock || !product.condition || !product.image || !product.userId || !product.categoryId) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }
    // Crear una nueva categoría
    // const newCategory = await Category.create({ name: 'Tecnologia' } as any);

    // Crear un nuevo producto en la categoría creada
    const newProduct = await Product.create({ 
      name: product.name, 
      description: product.description,
      price: product.price,
      stock: product.stock,
      condition: product.condition,
      image: product.image,
      userId: product.userId,
      categoryId: product.categoryId,
      //categoryId: newCategory.id,
    } as any);
   console.log(newProduct);
   //console.log(newCategory);
   
    console.log('CRUD operations completed successfully.');
    res.status(200).json(product)
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
  }
};
export { postProduct };
