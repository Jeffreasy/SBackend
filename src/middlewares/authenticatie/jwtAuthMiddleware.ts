import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import Gebruiker from '../../infrastructuur/database/modellen/gebruikerModel';
import { User } from '../../type/express';

interface JwtPayload {
  id: string;
}

function isJwtPayload(decoded: string | jwt.JwtPayload): decoded is JwtPayload {
  return (decoded as JwtPayload).id !== undefined;
}

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (isJwtPayload(decoded)) {
      const gebruiker = await Gebruiker.findById(decoded.id).exec();
      if (!gebruiker) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = gebruiker.toObject() as User; // Converteer naar plain object
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.error('Error in jwtAuthMiddleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
