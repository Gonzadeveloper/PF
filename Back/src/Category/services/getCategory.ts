import { Category } from '../../models/Category';

export const getCategory = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error('Error al obtener las categorías');
  }
};