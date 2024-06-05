import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(userId: string): string {
  const payload = { userId };
  const secret = process.env.AUTH_TOKEN as string;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}



