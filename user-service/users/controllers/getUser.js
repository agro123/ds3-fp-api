import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const command = new GetItemCommand({
      TableName: 'users',
      Key: { username: { S: username } }
    });

    const { Item } = await client.send(command);

    if (!Item) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: Item.id.S,
      fullName: Item.fullName.S,
      username: Item.username.S,
      rol: Item.rol.S
    });

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default getUser;