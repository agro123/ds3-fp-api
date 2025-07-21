import bcrypt from 'bcryptjs';
import {
  UpdateItemCommand,
  QueryCommand,
  GetItemCommand
} from '@aws-sdk/client-dynamodb';
import client from '../config/db.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }

  const fields = { name, email, password };
  const fieldsValid = Object.entries(fields).filter(
    ([, value]) => value !== undefined && value !== null
  );

  if (fieldsValid.length === 0) {
    return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
  }

  try {
    // Si se desea cambiar el email, verificar que no esté en uso

    const currentUserResult = await client.send(
      new GetItemCommand({
        TableName: 'users',
        Key: { id_user: { S: id } }
      })
    );

    const currentUser = currentUserResult.Item;

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if(email && !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'El email proporcionado no es válido' });
    }

    if (email && email !== currentUser.email?.S) {
      const emailQuery = new QueryCommand({
        TableName: 'users',
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': { S: email }
        }
      }); 

      const { Items } = await client.send(emailQuery);

      const emailEnUso = Items?.some(user => user.id?.S !== id);
      if (emailEnUso) {
        return res.status(409).json({ error: 'El correo ya está registrado por otro usuario' });
      }
    }

    let updateExpression = 'SET updated_at = :updated_at,';
    const expressionAttributeValues = {
      ':updated_at': { S: new Date().toISOString() }
    };
    const expressionAttributeNames = {};

    if (name !== undefined && name !== null) {
      updateExpression += ' #name = :name,';
      expressionAttributeValues[':name'] = { S: name };
      expressionAttributeNames['#name'] = 'name';
    }

    if (email !== undefined && email !== null) {
      updateExpression += ' email = :email,';
      expressionAttributeValues[':email'] = { S: email };
    }
    
    if (password !== undefined && password !== null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateExpression += ' password_hash = :password,';
      expressionAttributeValues[':password'] = { S: hashedPassword }; 
    }
  
    updateExpression = updateExpression.replace(/,$/, '');

    const command = new UpdateItemCommand({
      TableName: 'users',
      Key: {
        id_user: { S: id }
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ReturnValues: 'ALL_NEW'
    });

    const { Attributes } = await client.send(command);

    if (!Attributes) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const updatedUser = {
      id: Attributes.id?.S,
      name: Attributes.name?.S,
      email: Attributes.email?.S,
      updated_at: Attributes.updated_at?.S
    };

    return res.json({
      message: 'Usuario actualizado correctamente',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export default updateUserById;