import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB verbonden');
  } catch (error) {
    console.error('Fout bij verbinden met MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
