import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import serverless from "serverless-http";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.get("/", (req, res) => {
    res.send("It's working users api!");
});

const PORT = process.env.PORT || 32004;
app.get("/", (req, res) => {
    res.send("It's working users api!");
});

if (process.env.NODE_ENV !== 'prod') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

export const handler = serverless(app);