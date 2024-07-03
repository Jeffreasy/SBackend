import express from 'express';
import connectDB from '../database/database';
import routes from '../../routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Verbind met MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});

export default app;
