
import { sequelize } from '../../config/database';
import { User } from '../../models/User';
import { Address } from '../../models/Address';
import { Request, Response } from 'express';
import { ValidationError, UniqueConstraintError } from 'sequelize';

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

const postUser = async (req: Request, res: Response): Promise<void> => {
  const userdata: UserData = req.body;
  const transaction = await sequelize.transaction();

  try {
    console.log('Received user data:', userdata);

    // Crear un nuevo User dentro de la transacción
    const newUser = await User.create({
      name: userdata.name,
      email: userdata.email,
      password: userdata.password,
      typeuser: userdata.typeuser,
    } as any, { transaction });

    console.log('New user created:', newUser);

    // Crear una nueva Address dentro de la transacción
    const newAddress = await Address.create({
      address: userdata.address,
      city: userdata.city,
      state: userdata.state,
      postalcode: userdata.postalcode,
      country: userdata.country,
      userId: newUser.id,
    } as any, { transaction });

    console.log('New address created:', newAddress);

    // Si todo va bien, hacemos commit de la transacción
    await transaction.commit();

    console.log('User and Address created successfully.');
    res.status(201).json({ user: newUser, address: newAddress });
  } catch (error) {
    // Si hay algún error, hacemos rollback de la transacción
    await transaction.rollback();
    console.error('Error during transaction:', error);
    handleCreationError(error, res);
  }
};

function handleCreationError(error: any, res: Response): void {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.errors.map((e: any) => e.message).join(', '));
    res.status(400).json({ error: 'Validation error', details: error.errors });
  } else if (error instanceof UniqueConstraintError) {
    console.error('Unique constraint error:', error.errors.map((e: any) => e.message).join(', '));
    res.status(400).json({ error: 'Unique constraint error', details: error.errors });
  } else {
    console.error('Unknown error when creating user and address:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

export { postUser };