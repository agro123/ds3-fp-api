import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new DynamoDBClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export default client;