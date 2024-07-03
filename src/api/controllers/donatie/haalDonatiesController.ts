import { Request, Response } from 'express';
import Donatie from '../../../infrastructuur/database/modellen/donatieModel';

export const haalDonaties = async (req: Request, res: Response) => {
  try {
    const donaties = await Donatie.find();
    res.status(200).json(donaties);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Fout bij het ophalen van donaties', error });
  }
};
