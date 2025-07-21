from flask import Blueprint

rooms_bp = Blueprint('rooms', __name__)

# Importa las rutas y así se "conectan" al blueprint
from .create import register as register_create
from .delete import register as register_delete
from .get_all import register as register_get_all
from .get_by_id import register as register_get_by_id
from .update import register as register_update

register_create(rooms_bp)
register_delete(rooms_bp)
register_get_all(rooms_bp)
register_get_by_id(rooms_bp)
register_update(rooms_bp)
