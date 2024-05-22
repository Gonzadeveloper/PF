 import { sequelize } from '../config/database';
 import { User } from '../models/User';
 import { Address } from '../models/Address';
import { Request, Response } from 'express';
import { ValidationError, UniqueConstraintError } from 'sequelize';
//import { postUser } from '../controllers/getAllProductDb';

interface UserData {
    name: string;
    email: string;
    password: string;
    typeuser: string;
    address: string;
    city: string;
    state: string;
    postalcode: string;
    country: string;
  }

const postUser = async (req: Request, res: Response) : Promise<void> => {
    const userdata: UserData = req.body;
    
  try {
    console.log(userdata);
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

//     // Crear un nuevo Users
    const newUser = await User.create({ 
      name: userdata.name, 
      email: userdata.email,
      password: userdata.password,
      typeuser: userdata.typeuser,
     
    } as any);

      // Crear una nueva Adress
      const newAddress= await Address.create({ 
        address: userdata.address,
        city: userdata.city,
        state: userdata.state,
        postalcode: userdata.postalcode,
        country: userdata.country,
        userId: newUser.id

    } as any);

   console.log(newUser);
   console.log(newAddress);
   console.log('Usuarios y Direccio creado exitozamente.');
   res.status(200).json(userdata)
 } catch (error) {
    handleCreationError(error, res);
 }
};

function handleCreationError(error: any, res: Response): void {
    if (error instanceof ValidationError) {
      console.error('Error de validación:', error.errors.map((e: any) => e.message).join(', '));
      res.status(400).json({ error: 'Error de validación', details: error.errors });
    } else if (error instanceof UniqueConstraintError) {
      console.error('Error de restricción única:', error.errors.map((e: any) => e.message).join(', '));
      res.status(400).json({ error: 'Error de restricción única', details: error.errors });
    } else {
      console.error('Error desconocido al crear usuario y dirección:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  }

export { postUser };
//run();