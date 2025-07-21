import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }

  try {
    const command = new DeleteItemCommand({
      TableName: 'users',
      Key: {
        id_user: { S: id }
      },
      ReturnValues: 'ALL_OLD'
    });

    const { Attributes } = await client.send(command);

    if (!Attributes) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({ message: 'Usuario eliminado correctamente' });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export default deleteUserById;