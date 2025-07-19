import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const command = new DeleteItemCommand({
      TableName: 'users',
      Key: { username: { S: username } }
    });

    await client.send(command);

    res.json({ message: 'Usuario eliminado correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default deleteUser;