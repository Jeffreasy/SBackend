import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'; // Importeer bcrypt voor wachtwoord hashing

export interface IGebruiker extends Document {
  naam: string;
  email: string;
  wachtwoord: string;
  rol: string;
  createdAt: Date;
}

const GebruikerSchema: Schema = new Schema(
  {
    naam: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    wachtwoord: { type: String, required: true },
    rol: {
      type: String,
      enum: ['admin', 'donateur', 'vrijwilliger', 'evenementOrganisator'],
      default: 'donateur',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook om wachtwoorden te hashen
GebruikerSchema.pre('save', async function (next) {
  if (!this.isModified('wachtwoord')) return next();
  this.wachtwoord = await bcrypt.hash(this.wachtwoord, 10);
  next();
});

export default mongoose.model<IGebruiker>('Gebruiker', GebruikerSchema);
