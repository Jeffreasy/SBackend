import mongoose, { Schema, Document } from 'mongoose';

export interface IVrijwilliger extends Document {
  naam: string;
  email: string;
  telefoonnummer: string;
}

const VrijwilligerSchema: Schema = new Schema(
  {
    naam: {
      type: String,
      required: [true, 'Naam is verplicht'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'E-mail is verplicht'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Voer een geldig e-mailadres in'],
    },
    telefoonnummer: {
      type: String,
      // required: [true, 'Telefoonnummer is verplicht'],  // Commentaar deze regel uit
      trim: true,
      match: [/^[0-9]{10}$/, 'Voer een geldig telefoonnummer in (10 cijfers)'],
    },
  },
  {
    timestamps: true,
  }
);

// Voeg een pre-save hook toe om te debuggen
VrijwilligerSchema.pre('save', function (next) {
  console.log('Pre-save hook: ', this.toObject());
  next();
});

export default mongoose.model<IVrijwilliger>('Vrijwilliger', VrijwilligerSchema);
