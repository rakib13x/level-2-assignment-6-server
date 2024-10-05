import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config'; // Assuming config contains your JWT secret

// Middleware to authenticate token and attach user info to the request object
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(
    token,
    config.jwt_access_secret as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid access token' });
      }
      req.user = user; // user contains _id, email, and other details from the token
      next();
    }
  );
};
