from flask import Flask
from flask_cors import CORS
import awsgi
from dotenv import load_dotenv
import os

from routes import rooms_bp

load_dotenv()

ENV = os.getenv('ENV', 'dev')

app = Flask(__name__)
CORS(app)

app.register_blueprint(rooms_bp)

@app.route('/')
def home():
    return 'Microservicio de Salas activo'


if __name__ == '__main__' and ENV == 'dev':
    app.run(debug=True, host='0.0.0.0', port=32005)

def lambda_handler(event, context):
    event['httpMethod'] = event['requestContext']['http']['method']
    event['path'] = event['requestContext']['http']['path']
    event['queryStringParameters'] = event.get('queryStringParameters', {})
    return awsgi.response(app, event, context)
