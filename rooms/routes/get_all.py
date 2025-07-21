from flask import request, jsonify
from boto3.dynamodb.conditions import Attr
from db import get_connection

def register(bp):
    @bp.route('/rooms', methods=['GET'])
    def get_all_rooms():
        try:
            rooms_table = get_connection()
            room_type = request.args.get('type')

            scan_kwargs = {}

            if room_type:
                scan_kwargs['FilterExpression'] = Attr('type').eq(room_type)

            response = rooms_table.scan(**scan_kwargs)
            items = response.get('Items', [])

            formatted_rooms = []
            for item in items:
                formatted_rooms.append({
                    'id': item['id_room'],
                    'roomName': item.get('roomName', ''),
                    'capacity': item.get('roomCapacity', 0),
                    'roomType': item.get('roomType', ''),
                    'time': item.get('time', ''),
                    'equipment': item.get('equipment', []),
                    'reservations': item.get('reservations', []),
                    'createdAt': item.get('created_at', '')
                })

            return jsonify({'rooms': formatted_rooms}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
