
import { Request, Response } from 'express';
import { getUser } from '../services/getUser';

const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.query.name) {
      const users = await getUser();
      res.status(200).json(users);
    } else {
     
      res.status(400).json({ message: "Query parameter 'name' is not supported in this endpoint" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error', details: (error as Error).message });
  }
};

export { getAllUser };