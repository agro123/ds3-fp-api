import { ScanCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

export const getAllUsers = async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: 'users'
    });

    const { Items } = await client.send(command);

    const users = Items.map(user => ({
      id: user.id_user?.S,
      name: user.name?.S,
      email: user.email?.S,
      created_at: user.created_at?.S,
      isAdmin: user.isAdmin?.BOOL ?? false
    }));

    res.json(users);
    
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default getAllUsers;