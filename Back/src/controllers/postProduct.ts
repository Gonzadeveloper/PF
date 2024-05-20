import { Request, Response } from 'express';
import { Product } from '../modelos/Product';
import { User } from '../modelos/User'; // Asegúrate de importar el modelo User

export async function crearProducto(req: Request, res: Response) {
  try {
    const {
      userId, // Asumiendo que recibes el ID del usuario como parte de la solicitud
      categoryId,
      name,
      description,
      price,
      stockQuantity,
      condition
    } = req.body;

    // Validar que todos los campos necesarios están presentes
    if (!userId || !categoryId || !name || !description || !price || !stockQuantity || !condition) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear un nuevo producto vinculado con el usuario
    const nuevoProducto = await Product.create({
      categoryId,
      name,
      description,
      price,
      stockQuantity,
      condition,
      // Vincular el producto con el usuario
      UserId: userId,
    });

    // Enviar una respuesta exitosa
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}