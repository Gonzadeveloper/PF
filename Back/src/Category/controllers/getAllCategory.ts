import { Request, Response } from "express";
//import { getUser } from '../services/getUser';
import { getCategory } from "../services/getCategory";

const getAllCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.query.name) {
      const users = await getCategory();
      res.status(200).json(users);
    } else {
      // Puedes manejar la lógica cuando `name` está presente, por ejemplo, filtrando usuarios por nombre
      // const usersByName = await getUserByName(req.query.name as string);
      // res.status(200).json(usersByName);
      res
        .status(400)
        .json({
          message: "Query parameter 'name' is not supported in this endpoint",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error", details: (error as Error).message });
  }
};

export { getAllCategory };
