import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

export default app;