import { Request, Response } from 'express';
import Vrijwilliger from '../../../infrastructuur/database/modellen/vrijwilligerModel';

export const registreerVrijwilliger = async (req: Request, res: Response) => {
  try {
    const { naam, email } = req.body;
    const nieuweVrijwilliger = new Vrijwilliger({ naam, email });
    await nieuweVrijwilliger.save();
    res.status(201).json(nieuweVrijwilliger);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij het registreren van vrijwilliger', error });
  }
};

export const haalVrijwilligers = async (req: Request, res: Response) => {
  try {
    const vrijwilligers = await Vrijwilliger.find();
    res.status(200).json(vrijwilligers);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij het ophalen van vrijwilligers', error });
  }
};
