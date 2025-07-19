import pool from "../utils/db.js";


export const createReservation = async (req, res) => {
  const { user_id, room_id, date_reserve, hour_reserve, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, room_id, date_reserve, hour_reserve, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, room_id, date_reserve, hour_reserve, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error creating reservation' });
  }
};


export default createReservation