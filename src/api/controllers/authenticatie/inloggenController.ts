import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Gebruiker from '../../../infrastructuur/database/modellen/gebruikerModel';

export const loginGebruiker = async (req: Request, res: Response) => {
  const { email, wachtwoord } = req.body;

  try {
    const gebruiker = await Gebruiker.findOne({ email });
    if (!gebruiker) {
      return res.status(400).json({ message: 'Ongeldige inloggegevens' });
    }

    const isMatch = await bcrypt.compare(wachtwoord, gebruiker.wachtwoord);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ongeldige inloggegevens' });
    }

    const token = jwt.sign({ id: gebruiker._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
