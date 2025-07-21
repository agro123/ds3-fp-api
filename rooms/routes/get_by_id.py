from flask import Blueprint, request, jsonify
from db import get_connection

def register(bp):
    @bp.route('/rooms/<string:id_room>', methods=['GET'])
    def get_room(id_room):
        try:
            rooms_table = get_connection()

            response = rooms_table.get_item(
                Key={'id_room': id_room}
            )

            item = response.get('Item')
            if not item:
                return jsonify({'error': 'Sala no encontrada'}), 404

            response_value = {
                'id': item['id_room'],
                'roomName': item['roomName'],
                'capacity': item.get('roomCapacity', 0),
                'roomType': item.get('roomType', ''),
                'time': item.get('time', ''),
                'equipment': item.get('equipment', []),
                'reservations': item.get('reservations', []),
                'createdAt': item.get('created_at', '')
            }

            return jsonify(response_value), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
