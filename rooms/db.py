# rooms/db.py
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return psycopg2.connect(
        host="ds3-fp.cn6ksmmmcljy.us-east-2.rds.amazonaws.com",
        database="ds3_DB",
        user="admin_ds3",
        password="ds3pr0j3ct",
        port=5432
    )
