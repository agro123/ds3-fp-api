import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const  getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({ error: 'Missing user ID in path.' });
        }
    
        const client = new DynamoDBClient({ region: 'us-east-2' });
        const command = new GetItemCommand({
          TableName: 'users',
          Key: {
            id: { S: id },
          },
          ProjectionExpression: '#id, fullName, #role, username',
          ExpressionAttributeNames: {
            '#id': 'id',
            '#role': 'rol',
          },
        });
    
        const result = await client.send(command);
    
        console.log('User fetched successfully:', result.Item);
    
        if (!result.Item) {
          return res.status(404).json({ error: 'User not found.' });
        }
    
        const user = {
          id: result.Item.id.S,
          fullName: result.Item.fullName.S,
          username: result.Item.username.S,
          role: result.Item.rol.S,
        };
    
        return res.status(200).json(user);
    
      } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
}
export default getUser