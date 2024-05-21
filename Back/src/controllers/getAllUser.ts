
//import { User } from '../models/User';


import { Request, Response } from 'express';
import { getUser } from '../services/getUser';

const getAllUser = async ( req: Request, res: Response) => {
  
  try {
    if (!req.query.name) {
    const users = await getUser();
    //console.log(users);
    res.status(200).json(users);
    } else {
      return
    }
    
    // Puedes eliminar la condición de `!req.params` ya que es redundante
    
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error' });
  }
};

export {getAllUser};