import { Request, Response } from 'express';
import { Category } from "../../models/Category";

interface CategoryCreationAttributes {
  name: string;
}

const postCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body as CategoryCreationAttributes;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  try {
    const newCategory = await Category.create({ name } as Category);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postCategory };