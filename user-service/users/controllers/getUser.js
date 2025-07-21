import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const command = new GetItemCommand({
      TableName: 'users',
      Key: { email: { S: email } }
    });

    const { Item } = await client.send(command);

    if (!Item) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: Item.id.S,
      name: Item.name.S,
      email: Item.email.S,
      created_at: Item.created_at.S,
      isAdmin: Item.isAdmin.BOOL
    });

  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default getUser;