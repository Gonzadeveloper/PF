import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/User';


const login = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
  
      if (!name || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
  
      const user = await User.findOne({ where: { name } });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      const accessToken = jwt.sign({ userId: user.id }, process.env.AUTH_TOKEN as string, { expiresIn: '1h' });
  
      return res.json({ accessToken });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export { login };
