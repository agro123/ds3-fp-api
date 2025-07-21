import { GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const getUser = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Debes proporcionar id o email' });
  }

  try {
    let user;

    const isEmail = EMAIL_REGEX.test(email);

    if (!isEmail) {
      // Buscar por ID (clave principal)
      const command = new GetItemCommand({
        TableName: 'users',
        Key: {
          id_user: { S: email }
        }
      });

      const { Item } = await client.send(command);
      user = Item;

    } else if (email) {
      // Buscar por email (usando índice secundario global "email-index")
      const command = new QueryCommand({
        TableName: 'users',
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': { S: email }
        },
        Limit: 1
      });

      const { Items } = await client.send(command);
      user = Items?.[0];
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const responseUser = {
      id: user.id_user?.S,
      name: user.name?.S,
      email: user.email?.S,
      created_at: user.created_at?.S,
      isAdmin: user.isAdmin?.BOOL ?? false,
      session_token: user.session_token?.S || null,
      session_expires_at: user.session_expires_at?.S || null
    };

    return res.json(responseUser);

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export default getUser;