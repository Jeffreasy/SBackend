import mongoose, { Schema, Document } from 'mongoose';

export interface IEvenement extends Document {
  naam: string;
  datum: Date;
  locatie: string;
}

const EvenementSchema: Schema = new Schema({
  naam: { type: String, required: true },
  datum: { type: Date, required: true },
  locatie: { type: String, required: true },
});

export default mongoose.model<IEvenement>('Evenement', EvenementSchema);
