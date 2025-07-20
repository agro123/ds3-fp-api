import createReservation from '../entities/createReservation.js';
import getAllReservations from '../entities/getAllReservations.js';
import updateReservation from '../entities/updateReservation.js';
import deleteReservation from '../entities/deleteReservation.js';
import getReservationById from '../entities/getReservationById.js';

import pool from '../utils/db.js';


jest.spyOn(console, 'error').mockImplementation();

// Mock del pool
jest.mock('../utils/db.js', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis(res);
  res.json = jest.fn().mockReturnThis(res);
  res.send = jest.fn().mockReturnThis(res);
  return res;
};

describe('Reservation Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllReservations debe retornar todas las reservas', async () => {
    const res = mockRes();
    pool.query.mockReturnValue({ rows: [{ id_reserve: 1 }] });

    await getAllReservations({}, res);

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM reservations');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id_reserve: 1 }]);
  });

  test('getReservationById retorna 404 si no se encuentra', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();
    pool.query.mockReturnValue({ rows: [] });

    await getReservationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Reservation not found' });
  });

  test('createReservation crea una reserva', async () => {
    const req = {
      body: {
        user_id: 'user1',
        room_id: 'A101',
        date_reserve: '2025-07-20',
        hour_reserve: '15:00',
        status: 'active',
      },
    };
    const res = mockRes();
    const fakeReservation = { id_reserve: 1, ...req.body };

    pool.query.mockReturnValue({ rows: [fakeReservation] });

    await createReservation(req, res);

    expect(pool.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeReservation);
  });

  test('updateReservation actualiza campos válidos', async () => {
    const req = {
      params: { id: 1 },
      body: {
        room_id: 'A105',
        user_id: null, // debe ser eliminado por lodash
      },
    };
    const res = mockRes();
    const updatedReservation = { id_reserve: 1, room_id: 'A105' };

    pool.query.mockReturnValue({ rows: [updatedReservation] });

    await updateReservation(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      'UPDATE reservations SET room_id = $1 WHERE id_reserve = $2 RETURNING *',
      ['A105', 1]
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedReservation);
  });

  test('updateReservation responde 400 si no hay campos válidos', async () => {
    const req = { params: { id: 1 }, body: { user_id: null, status: undefined } };
    const res = mockRes();

    await updateReservation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'No fields provided to update' });
  });

  test('deleteReservation elimina y retorna 204', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    pool.query.mockReturnValue({ rows: [{ id_reserve: 1 }] });

    await deleteReservation(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM reservations WHERE id_reserve = $1 RETURNING *',
      [1]
    );

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteReservation retorna 404 si no se encuentra', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    pool.query.mockReturnValue({ rows: [] });

    await deleteReservation(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Reservation not found' });
  });
});
