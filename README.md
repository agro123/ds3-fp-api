# Proyecto UniSalas

## Descripción y contexto

**UniSalas** es una aplicación web que simula un sistema de reservas de salas dentro de un campus universitario. Está diseñada para permitir a estudiantes registrar y administrar reservas de espacios como auditorios, laboratorios, salas de cómputo y salones. Cada reserva puede configurarse con el día, hora y duración deseada.

El sistema también provee información relevante sobre cada sala, como su capacidad y equipamiento (por ejemplo, proyector o aire acondicionado).

---

## Ejecutar localmente

### Estructura del proyecto

```
├── frontend/                      # Aplicación web en React
├── auth/                          # Servicio de autenticación - Python + Flask
├── users-service/                # Gestión de usuarios - Node.js + Express
├── rooms/                         # Gestión de salas - Python + Flask
├── reservation/                   # Gestión de reservas - Node.js + Express
├── make-reservation-orchestrator/ # Orquestador de reservas - Node.js + Express
```

---

### Requisitos

* Node.js >20
* Python >3.9.6
* pip

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/agro123/ds3-fp-api.git
cd ds3-fp-api
```

---

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Abrir en navegador: `http://localhost:5173/`

---

### 3. Auth (Puerto 32003)

```bash
cd auth
pip install --upgrade pip
pip install --no-cache-dir -r model/requirements.txt
```

Crear archivo `.env`:

```env
JWT_SECRET="ds3-final-project-secret"
JWT_EXPIRATION_MINUTES=60
ENV="dev"
```

Iniciar:

```bash
python3 app.py
```

---

### 4. Users-service (Puerto 32004)

```bash
cd users-service
npm install
```

Archivo `.env`:

```env
AWS_ACCESS_KEY_ID=<tu_key>
AWS_SECRET_ACCESS_KEY=<tu_secret>
```

Iniciar:

```bash
npm start
```

---

### 5. Rooms (Puerto 32005)

```bash
cd rooms
pip install --upgrade pip
pip install --no-cache-dir -r model/requirements.txt
```

Archivo `.env`:

```env
ENV="dev"
AWS_ACCESS_KEY_ID=<tu_key>
AWS_SECRET_ACCESS_KEY=<tu_secret>
```

Iniciar:

```bash
python3 app.py
```

---

### 6. Reservation (Puerto 32002)

```bash
cd reservation
npm install
```

Archivo `.env`:

```env
BD_HOST="ds3-fp.cn6ksmmmcljy.us-east-2.rds.amazonaws.com"
BD_PORT=5432
BD_DATABASE="ds3_DB"
BD_PASSWORD="ds3pr0j3ct"
BD_USER="admin_ds3"
```

Iniciar:

```bash
npm start
```

---

### 7. Make-reservation-orchestrator (Puerto 32006)

```bash
cd make-reservation-orchestrator
npm install
```

Archivo `.env`:

```env
API_URL="https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com"
```

Iniciar:

```bash
npm start
```

---

## Endpoints

### 🔐 Auth

**Login**
`POST http://localhost:32003/login`

```json
{
  "email": "example@gmail.com",
  "password": "1234"
}
```

---

### 👤 Users-service

* `GET http://localhost:32004/users` — Obtener todos los usuarios
* `GET http://localhost:32004/users/{user_id}` — Obtener usuario por ID
* `POST http://localhost:32004/users` — Crear usuario
* `PUT http://localhost:32004/users/{user_id}` — Actualizar usuario
* `DELETE http://localhost:32004/users/{user_id}` — Eliminar usuario

---

### 🏢 Rooms

* `GET http://localhost:32005/rooms` — Obtener todas las salas
* `GET http://localhost:32005/rooms/{room_id}` — Obtener sala por ID
* `POST http://localhost:32005/rooms` — Crear nueva sala
* `PUT http://localhost:32005/rooms/{room_id}` — Actualizar sala
* `DELETE http://localhost:32005/rooms/{room_id}` — Eliminar sala

Ejemplo de cuerpo para POST:

```json
{
  "name": "Sala de Sistemas B-301",
  "type": "Sala de cómputo",
  "capacity": 25,
  "equipment": [
    "25 computadores",
    "Servidores",
    "Switch de red",
    "UPS",
    "Sistema de respaldo"
  ]
}
```

---

### 📆 Reservations

* `GET http://localhost:32002/reservations` — Ver todas las reservas
* `GET http://localhost:32002/reservations/{room_id}` — Ver reservas por ID
* `POST http://localhost:32002/reservations` — Crear nueva reserva
* `PUT http://localhost:32002/reservations/{room_id}` — Actualizar reserva
* `DELETE http://localhost:32002/reservations/{room_id}` — Eliminar reserva

Ejemplo de cuerpo para POST:

```json
{
  "user_id": "1",
  "room_id": "A101",
  "roomName": "Salon A1",
  "date": "2025-07-20",
  "startTime": "15:00",
  "endTime": "16:00",
  "status": "confirmed"
}
```

---

### 🔄 Make-reservation-orchestrator

* `POST http://localhost:32006/make-reservation`

```json
{
  "user_id": "1",
  "room_id": "A101",
  "roomName": "Salon A1",
  "date": "2025-07-20",
  "startTime": "15:00",
  "endTime": "16:00"
}
```
