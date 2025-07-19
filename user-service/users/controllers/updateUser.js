import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import bcrypt from 'bcrypt';
import client from '../config/db.js';

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { fullName, rol, password } = req.body;

  try {
    const updates = [];
    const values = {};

    if (fullName) {
      updates.push('fullName = :fullName');
      values[':fullName'] = { S: fullName };
    }

    if (rol) {
      updates.push('rol = :rol');
      values[':rol'] = { S: rol };
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = :password');
      values[':password'] = { S: hashedPassword };
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay campos para actualizar.' });
    }

    const command = new UpdateItemCommand({
      TableName: 'users',
      Key: { username: { S: username } },
      UpdateExpression: `SET ${updates.join(', ')}`,
      ExpressionAttributeValues: values
    });

    await client.send(command);

    res.json({ message: 'Usuario actualizado correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default updateUser;