import { Request, Response } from 'express';
import { Category } from '../../models/Category';

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await category.destroy(); // Esto hará un borrado lógico
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteCategory };