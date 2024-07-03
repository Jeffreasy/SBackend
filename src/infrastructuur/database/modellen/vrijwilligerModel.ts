import mongoose, { Schema, Document } from 'mongoose';

export interface IVrijwilliger extends Document {
  naam: string;
  email: string;
  telefoonnummer?: string; // Telefoonnummer optioneel
  interesses?: string[]; // Array van interesses (optioneel)
}

const VrijwilligerSchema: Schema = new Schema(
  {
    naam: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Voer een geldig e-mailadres in'],
    },
    telefoonnummer: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Voer een geldig telefoonnummer in (10 cijfers)'],
    },
    interesses: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IVrijwilliger>('Vrijwilliger', VrijwilligerSchema);
