import pool from "../utils/db.js";

export const getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reservations WHERE id_reserve = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });

    const response = result.rows.map(row => ({
      id: row.id_reserve,
      userId: row.user_id,
      roomId: row.room_id,
      date: row.date_reserve,
      startTime: row.start_time,
      endTime: row.end_time,
      status: row.status
    }));
    res.status(200).json(response[0]);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'Error fetching reservation' });
  }
  await pool.end();
};

export default getReservationById;