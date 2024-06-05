import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // No token provided
    return;
  }

  jwt.verify(token, process.env.AUTH_TOKEN as string, (err, user) => {
    if (err) {
      res.sendStatus(403); // Invalid token
      return;
    }
    (req as any).user = user;
    next();
  });
};

export default authenticateToken;

