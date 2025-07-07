import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';
import bcrypt from 'bcrypt';


const createUser = async (req, res) => {
    try {
        const { fullName, username, rol, password } = req.body;

        const client = new DynamoDBClient({ region: 'us-east-2' });

        // Validaciones básicas
        if (!fullName || !username || !rol || !password) {
            return res
                .status(400)
                .json({ error: "Faltan campos obligatorios." });
        }

        // Crear un ID único
        const id = crypto.randomUUID();

        const hashedPassword = await bcrypt.hash(password, 10);

        const command = new PutItemCommand({
            TableName: "users",
            Item: {
                id: { S: id },
                fullName: { S: fullName },
                username: { S: username },
                rol: { S: rol },
                password: { S: hashedPassword },
            },
            ConditionExpression: "attribute_not_exists(username)", // Evita duplicados
        });

        await client.send(command);

        return res.status(201).json({ message: "Usuario creado", id });
    } catch (error) {
        console.error("Error al insertar:", error);

        let statusCode = 500;
        let message = "Error interno del servidor";

        if (error.name === "ConditionalCheckFailedException") {
            statusCode = 409;
            message = "El usuario ya existe";
        }

        return res.status(statusCode).json({ error: message });
    }
};

export default createUser