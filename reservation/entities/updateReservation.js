import pool from "../utils/db.js";
import _ from 'lodash';

export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const fields = _.pickBy(req.body, v => v != null); // Elimina null y undefined

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const query = `UPDATE reservations SET ${setClause} WHERE id_reserve = $${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating reservation' });
  }
};


export default updateReservation;