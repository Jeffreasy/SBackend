import { Request } from 'express';

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}