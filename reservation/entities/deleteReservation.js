import pool from "../utils/db.js";

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reservations WHERE id_reserve = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
    res.status(204).send('Reservation deleted successfully');
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error deleting reservation' });
  }
  await pool.end();
};
export default deleteReservation;