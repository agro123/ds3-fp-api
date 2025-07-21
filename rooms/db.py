import os
from dotenv import load_dotenv
import boto3

load_dotenv()
""" 
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_PORT = int(os.getenv('DB_PORT'))   
 """
ENV = os.getenv('ENV', 'dev')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

""" def get_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    ) """

def get_connection():
    if ENV == 'dev' and AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
        dynamodb = boto3.resource('dynamodb', 
            region_name='us-east-2',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
        return dynamodb.Table('RoomsAvailability')
    else:
        dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
        return dynamodb.Table('RoomsAvailability')