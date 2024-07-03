import mongoose, { Schema, Document } from 'mongoose';

export interface IDonatie extends Document {
  bedrag: number;
  donateurNaam: string;
  bericht?: string;
}

const DonatieSchema: Schema = new Schema({
  bedrag: { type: Number, required: true },
  donateurNaam: { type: String, required: true },
  bericht: { type: String },
});

export default mongoose.model<IDonatie>('Donatie', DonatieSchema);
