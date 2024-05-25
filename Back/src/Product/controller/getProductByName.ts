
import { sequelize } from '../../config/database';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { Op } from 'sequelize';
import { User } from '../../models/User';


export const getProductByName = async(name: string): Promise<Product | undefined> => {
    
   
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'); 
       
        // Leer productos
        const product = await Product.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // Utiliza el operador iLike para búsqueda insensible a mayúsculas y minúsculas en PostgreSQL
                  }
            },
            include: [{
              model: Category,
              attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de Category
            },
            {
              model: User,
              attributes: ['id', 'name'] // Especifica los atributos que deseas incluir de User
            }],
            attributes: ['id', 'name', 'description', 'price', 'stock', 'condition', 'userId', 'categoryId', 'image'] // Especifica los atributos que deseas incluir de Product
          });
          
          
          if (!product) {
            console.log(`Product with name ${name} not found.`);
            return undefined;
          }
      
          console.log('CRUD operations completed successfully.');
          return product;
      } catch (error) {
        console.error('Unable to perform CRUD operations:', error);
      }
      return 

};
