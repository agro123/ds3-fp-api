import pool from "../utils/db.js";

export const getAllReservations = async (req, res) => {
  try {
    const { room_id, user_id, date_reserve, hour_reserve, status } = req.query;

    const conditions = [];
    const values = [];

    if (room_id) {
      values.push(room_id);
      conditions.push(`room_id = $${values.length}`);
    }

    if (user_id) {
      values.push(user_id);
      conditions.push(`user_id = $${values.length}`);
    }

    if (date_reserve) {
      values.push(date_reserve);
      conditions.push(`date_reserve = $${values.length}`);
    }

    if (hour_reserve) {
      values.push(hour_reserve);
      conditions.push(`hour_reserve = $${values.length}`);
    }

    const allowedStates = ['confirmed', 'pending', 'cancelled'];
    if (status && !allowedStates.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `SELECT * FROM reservations ${whereClause} ORDER BY date_reserve, hour_reserve`;

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

export default getAllReservations;

//GET /reservations?room_id=abc123&status=confirmed
