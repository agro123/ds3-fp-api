from boto3.dynamodb.conditions import Attr
from flask import Blueprint, request, jsonify
import datetime
from .create import ALLOWED_TYPES

from db import get_connection

def register(bp):
    @bp.route('/rooms/<string:id_room>', methods=['PUT'])
    def update_room(id_room):
        try:
            rooms_table = get_connection()
            data = request.get_json()

            updatable_fields = ['name', 'capacity', 'type ', 'equipment', 'reservations']
            update_values = {k: v for k, v in data.items() if k in updatable_fields and v is not None}

            now = datetime.datetime.now(datetime.timezone.utc).isoformat() + 'Z'
            update_values['updated_at'] = now

            if not update_values:
                return jsonify({'error': 'No se proporcionaron campos válidos para actualizar'}), 400
            
            if 'type' in data and data['type'] not in ALLOWED_TYPES:
                return jsonify({'error': f"Tipo de sala inválido. Tipos permitidos: {', '.join(ALLOWED_TYPES)}"}), 400

            

            update_expression_parts = []
            expression_attribute_values = {}

            table_keys =  ['roomName', 'roomCapacity', 'roomType']
            for i, (key, value) in enumerate(update_values.items()):
                placeholder = f":val{i}"
                key_formatted = key
                if key not in table_keys:
                    key_formatted = f"room{key.capitalize()}"
                update_expression_parts.append(f"{key_formatted} = {placeholder}")
                expression_attribute_values[placeholder] = value

            update_expression = "SET " + ", ".join(update_expression_parts)

            rooms_table.update_item(
                Key={'id_room': id_room},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values,
                ConditionExpression=Attr('id_room').exists()
            )

            return jsonify({'message': f'Sala {id_room} actualizada correctamente'}), 200

        except rooms_table.meta.client.exceptions.ConditionalCheckFailedException:
            return jsonify({'error': 'Sala no encontrada'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500