import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import client from '../config/db.js';

const createUser = async (req, res) => {
const { name, email, password, isAdmin } = req.body;
console.log('Datos recibidos desde Postman:', req.body);

  if (!name || !email || !password || typeof isAdmin !== 'boolean') {
    return res.status(400).json({ error: "Campos requeridos faltantes." });
  }

  try {
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const command = new PutItemCommand({
      TableName: 'users',
      Item: {
        id: { S: id },
        name: { S: name },
        email: { S: email },
        password_hash: { S: hashedPassword },
        created_at: { S: createdAt },
        isAdmin: { BOOL: isAdmin }
      },
      ConditionExpression: 'attribute_not_exists(email)' 
    });

    await client.send(command);

    res.status(201).json({ message: 'Usuario creado', id });

  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default createUser;
