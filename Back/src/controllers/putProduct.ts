import { Request, Response } from 'express';
import { Product } from "../models/Product";
import { formPutFood } from "../utils/formputFood";
import { User } from "../models/User"; // Asegúrate de que la ruta al modelo User sea correcta
import { Category } from "../models/Category"; // Asegúrate de que la ruta al modelo Category sea correcta

// Función que actualiza el producto en la base de datos
const updateProduct = async (id: number, updateData: formPutFood) => {
    // Encontrar el producto por ID
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }

    // Si hay un user ID, verificar que el usuario exista
    if (updateData.userId) {
        const user = await User.findByPk(updateData.userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
    }

    // Si hay una category ID, verificar que la categoría exista
    if (updateData.categoryId) {
        const category = await Category.findByPk(updateData.categoryId);
        if (!category) {
            throw new Error("Categoría no encontrada");
        }
    }

    // Actualizar el producto con los nuevos datos
    return await product.update(updateData);
};

// Controlador que maneja la solicitud PUT para actualizar un producto
export const putProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updateData: formPutFood = req.body;
        const updatedProduct = await updateProduct(Number(id), updateData);
        res.json(updatedProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            // Manejo de errores no esperados
            res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
};