import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

interface CustomRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Authorization failed. Token required.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error authorizing token:', error.message);
    }
    res.status(401).json({ message: 'Authorization failed. Invalid token.' });
  }
};
