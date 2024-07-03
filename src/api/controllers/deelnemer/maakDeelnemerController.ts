import { Request, Response } from 'express';
import mongoose from 'mongoose';

const db = mongoose.connection.useDb('mydatabase'); // Vervang 'mydatabase' door de naam van je database
const deelnemersCollection = db.collection('deelnemers');

// POST /api/v1/deelnemers
export const createDeelnemer = async (req: Request, res: Response) => {
  const newDeelnemer = req.body;
  try {
    const result = await deelnemersCollection.insertOne(newDeelnemer);
    const createdDeelnemer = await deelnemersCollection.findOne({
      _id: result.insertedId,
    });
    res.status(201).json(createdDeelnemer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
