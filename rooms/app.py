# app.py
from flask import Flask
from routes.rooms import rooms

app = Flask(__name__)
app.register_blueprint(rooms)

@app.route('/')
def home():
    return 'Microservicio de Salas activo 🚀'

if __name__ == '__main__':
    app.run(debug=True, port=5001)
