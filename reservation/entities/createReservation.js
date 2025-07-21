import pool from "../utils/db.js";

export const createReservation = async (req, res) => {
  const { user_id, room_id, date_reserve, hour_reserve, status } = req.body;

  if (!user_id || !room_id || !date_reserve || !hour_reserve || !status) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const date = new Date(date_reserve);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'date_reserve debe ser una fecha válida' });
  }

  const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(hour_reserve)) {
    return res.status(400).json({ error: 'hour_reserve debe tener formato HH:mm' });
  }

  const allowedStatuses = ['confirmed', 'pending', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: `status debe ser uno de: ${allowedStatuses.join(', ')}` });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, room_id, date_reserve, hour_reserve, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, room_id, date_reserve, hour_reserve, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
  await pool.end();
};


export default createReservation