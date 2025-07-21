from flask import request, jsonify
import datetime

from db import get_connection

ALLOWED_TYPES = ['Auditorios', 'Laboratorio', 'Sala de cómputo', 'Salon']

def register(bp):
    @bp.route('/rooms', methods=['POST'])
    def create_room():
        data = request.get_json()

        rooms_table = get_connection()

        required_fields = ['name', 'capacity', 'type']
        missing = [field for field in required_fields if field not in data]
        if missing:
            return jsonify({'error': f'Campos requeridos faltantes: {", ".join(missing)}'}), 400
        
        room_type = data.get('type')
        if room_type not in ALLOWED_TYPES:
            return jsonify({'error': f"Tipo de sala inválido. Tipos permitidos: {', '.join(ALLOWED_TYPES)}"}), 400

        try:
            name_sanitized = data['name'].strip().lower().replace(" ", "-")
            now = datetime.datetime.now(datetime.timezone.utc)
            id_room = f"{name_sanitized}-{int(now.timestamp())}"
            
            

            item = {
                'id_room': id_room,
                'roomName': data['name'],
                'roomCapacity': data.get('capacity', 0),
                'roomType': data['type'],
                'equipment': data.get('equipment', []),
                'reservations': [],
                'created_at': now.isoformat() + 'Z',
            }

            response_value = {
                'id': item['id_room'],
                'roomName': item['roomName'],
                'capacity': item['roomCapacity'],
                'roomType': item['roomType'],
                'equipment': item['equipment'],
                'reservations': [],
                'createdAt': item['created_at']
            }

            rooms_table.put_item(Item=item)
            return jsonify({'message': 'Sala creada correctamente', 'item': response_value}), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500