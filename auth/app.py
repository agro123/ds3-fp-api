from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
from dotenv import load_dotenv
import jwt


import boto3
from boto3.dynamodb.conditions import Key
import awsgi

import os
import datetime


app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
table = dynamodb.Table('users')  

JWT_SECRET = os.getenv('JWT_SECRET', 'dev-key')  # ⚠️ En prod, guarda esto seguro
JWT_EXPIRATION_MINUTES = int(os.getenv('JWT_EXPIRATION_MINUTES', 60))

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email y password son requeridos'}), 400

    try:
        response = table.query(
            IndexName='email-index',
            KeyConditionExpression=Key('email').eq(email)
        )

    except Exception as e:
        return jsonify({'error': 'Error al acceder a la base de datos', 'details': str(e)}), 500
    

    print("Response from DynamoDB:", response)
    
    if len(response.get('Items')) == 0:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
    user = response.get('Items')[0]

    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return jsonify({'error': 'Contraseña incorrecta'}), 401
    

    payload = {
        'sub': user['id_user'],
        'email': user['email'],
        'iat': datetime.datetime.now(datetime.timezone.utc),
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=JWT_EXPIRATION_MINUTES)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')

    update_response = table.update_item(
        Key={'id_user': user['id_user']},
        UpdateExpression="SET session_token = :val1, session_expires_at = :val2",
        ExpressionAttributeValues={
            ':val1': token,
            ':val2': payload['exp'].isoformat() + 'Z'
        },
        ReturnValues="UPDATED_NEW"
    )

    print("Update response:", update_response)

    return jsonify({
        'token': token,
        'date': datetime.datetime.now().isoformat() + 'Z',
        'expires_at': payload['exp'].isoformat() + 'Z',
        'userId': user['id_user'],
        'email': user['email'],
    }), 200

@app.route('/')
def index():
    return "API AUTH working!!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=32003)


def lambda_handler(event, context):
    return awsgi.response(app, event, context)
