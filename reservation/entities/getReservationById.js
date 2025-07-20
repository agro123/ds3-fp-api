import pool from "../utils/db.js";

export const getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reservations WHERE id_reserve = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error fetching reservation' });
  }
  await pool.end();
};

export default getReservationById;