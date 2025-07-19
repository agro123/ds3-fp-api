import pool from "../utils/db.js";

export const getAllReservations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

export default getAllReservations