import { Request, Response } from 'express';

export const beveiligdEndpoint = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Toegang verleend tot beveiligd endpoint!' });
};
