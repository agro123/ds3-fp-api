import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { createUser, getAllUsers } from './entities/createUser.js';
import { authenticateUser } from './entities/getUser.js';
import { updateUser } from './entities/updateUser.js';
import { deleteUser } from './entities/deleteUser.js';

const app = express();
app.use(express.json());

const JWT_SECRET = 'clave_super_secreta';

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = getAllUsers().find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: 'Usuario ya registrado' });
  }

  const user = await createUser(email, password);
  res.status(201).json({ message: 'Usuario registrado', user: { email: user.email } });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);

  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.put('/update', async (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = updateUser(email, hashedPassword);

  if (!updatedUser) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({ message: 'Contraseña actualizada', email: updatedUser.email });
});


app.delete('/delete', (req, res) => {
  const { email } = req.body;

  const deleted = deleteUser(email);

  if (!deleted) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({ message: 'Usuario eliminado', email });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
  });
}

export default app;