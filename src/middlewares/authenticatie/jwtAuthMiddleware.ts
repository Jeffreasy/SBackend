import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../type/express';

interface JwtPayload {
  id: string;
}

interface RequestWithUser extends Request {
  user?: User;
}

export const jwtAuthMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = { id: decoded.id } as User;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
