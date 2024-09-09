import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from './config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded;
    next();
    return;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
