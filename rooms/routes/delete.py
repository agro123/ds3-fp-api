from flask import request, jsonify
from boto3.dynamodb.conditions import Attr
from db import get_connection


def register(bp):
    @bp.route('/rooms/<string:id_room>', methods=['DELETE'])
    def delete_room(id_room):
        try:
            rooms_table = get_connection()

            existing = rooms_table.get_item(Key={'id_room': id_room})
            if 'Item' not in existing:
                return jsonify({'error': 'Sala no encontrada'}), 404

            rooms_table.delete_item(Key={'id_room': id_room})

            return jsonify({'message': f'Sala {id_room} eliminada correctamente'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

