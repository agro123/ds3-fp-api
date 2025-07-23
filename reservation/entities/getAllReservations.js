import pool from "../utils/db.js";

export const getAllReservations = async (req, res) => {
  try {
    const { room_id, user_id, startTime, date, status } = req.query;

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

    if (date) {
      values.push(date);
      conditions.push(`date_reserve = $${values.length}`);
    }

    if (startTime) {
      values.push(startTime);
      conditions.push(`start_time = $${values.length}`);
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

    const query = `SELECT * FROM reservations ${whereClause} ORDER BY date_reserve, start_time`;

    const result = await pool.query(query, values);

    const response = result.rows.map(row => ({
      id: row.id_reserve,
      userId: row.user_id,
      roomId: row.room_id,
      date: row.date_reserve,
      startTime: row.start_time,
      endTime: row.end_time,
      status: row.status,
      roomName: row.room_name
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

export default getAllReservations;

//GET /reservations?room_id=abc123&status=confirmed
