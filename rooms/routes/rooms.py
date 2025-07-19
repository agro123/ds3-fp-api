# routes/rooms.py
from flask import Blueprint, request, jsonify
from db import get_connection

rooms = Blueprint('rooms', __name__)

@rooms.route('/rooms', methods=['POST'])
def create_room():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO rooms (name, date, time, available)
        VALUES (%s, %s, %s, %s)
    """, (data['name'], data['date'], data['time'], data['available']))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Sala registrada con éxito"}), 201
