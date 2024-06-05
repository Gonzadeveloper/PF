import { generateToken } from './tokenGenerator';
import dotenv from 'dotenv';

dotenv.config();

const testUserId = 'testUserId';
const testToken = generateToken(testUserId);
console.log('Token de prueba:', testToken);
