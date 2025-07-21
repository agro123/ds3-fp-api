import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import bcrypt from 'bcrypt';
import client from '../config/db.js';

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, password, isAdmin } = req.body;

  try {
    const updates = [];
    const values = {};

    if (name) {
      updates.push('name = :name');
      values[':name'] = { S: name };
    }

    if (typeof isAdmin === 'boolean') {
      updates.push('isAdmin = :isAdmin');
      values[':isAdmin'] = { BOOL: isAdmin };
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password_hash = :password');
      values[':password'] = { S: hashedPassword };
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay campos para actualizar.' });
    }

    const command = new UpdateItemCommand({
      TableName: 'users',
      Key: { email: { S: email } },
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