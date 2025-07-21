import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";
import axios from "axios";

dotenv.config();

const PORT = 35006;

const app = express();

app.use(express.json())
app.use(cors());

const API_URL = process.env.API_URL;

app.post("/make-reservation", async (req, res) => {
  const { user_id, room_id, date, startTime, endTime } = req.body;

  if (!API_URL) {
    throw new Error("La variable de entorno API_URL no está definida");
  }

  if (!user_id || !room_id || !date || !startTime || !endTime) {
    return res.status(400).send("Campos incompletos");
  }

  let reservationId = null;
  let resultDelete = '';

  const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  let erroCode = 500;
  let entity = "reservations";
  try {
    const reservation = await api.post("/reservation", {
        user_id,
        room_id,
        date,
        startTime,
        endTime,
        status: "pending"
    });
    reservationId = reservation.data.id_reserve;

    //Verificar que el usuario existe
    const userResponse = await api.get(`/users/${user_id}`);
    if (!userResponse.data) {
        erroCode = 404;
        entity = "users";
        throw new Error("El usuario no existe");
    }

    //Verificar que la sala existe
    const roomResponse = await api.get(`/rooms/${room_id}`);
    if (!roomResponse.data) {
        erroCode = 404;
        entity = "rooms";
        throw new Error("La sala no existe");
    }

    //Verificar que no esté reservada en esa fecha y hora
    const confirmed = await api.get(`/reservation`, {
            params: {
                room_id,
                date,
                startTime,
                status: 'confirmed'
            }
        })

    console.log("Confirmed reservations:", confirmed.data);

    if (confirmed.data.length > 0) {
        erroCode = 409;
        entity = "reservations";
        throw new Error("La sala ya está reservada en esa fecha y hora");
    }

    // Crear la reserva con estado 'confirmed' directamente (ya pasó todas las validaciones)
    await api.put(`/reservation/${reservationId}`, {
        status: "confirmed"
    });

    reservationId = reservation.data.id_reserve;

    // Actualizar las reservas de la sala en DynamoDB
    const allRoomReservations = await api.get(`/reservation`, {
        params: { room_id }
    });

    await api.put(`/rooms/${room_id}`, {
        reservations: allRoomReservations.data
    });

    return res.status(200).send("¡Reserva realizada con éxito!");
  } catch (error) {

    if (reservationId) {
      resultDelete = await api
        .delete(`/reservation/${reservationId}`)
        .then(() => "Eliminada correctamente")
        .catch(err => `Error al eliminar la reserva: ${err.message}`);
    }

    const mensaje = error.response?.data?.error || error.message || "Error desconocido";

    return res.status(erroCode).send(`Error al procesar la reserva: ${mensaje}. ${resultDelete} ${entity}`);
  }
});


app.get("/", async (req, res) => {
    res.send("It's working orchestrator api!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export const handler = serverless(app);