import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import client from '../config/db.js';

const createUser = async (req, res) => {
  const { fullName, username, rol, password } = req.body;

  if (!fullName || !username || !rol || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const command = new PutItemCommand({
      TableName: 'users',
      Item: {
        id: { S: id },
        fullName: { S: fullName },
        username: { S: username },
        rol: { S: rol },
        password: { S: hashedPassword }
      },
      ConditionExpression: 'attribute_not_exists(username)'
    });

    await client.send(command);

    res.status(201).json({ message: 'Usuario creado', id });

  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default createUser;
