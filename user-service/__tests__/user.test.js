import request from 'supertest';
import app from '../users/index.js';

describe('user-service CRUD test', () => {

  const usernameTest = 'testuser_' + Date.now();

  it('Crear un usuario nuevo', async () => {
    const res = await request(app).post('/users').send({
      fullName: 'Test User',
      username: usernameTest,
      rol: 'tester',
      password: 'pass1234'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('Obtener el usuario creado', async () => {
    const res = await request(app).get(`/users/${usernameTest}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe(usernameTest);
  });

  it('Actualizar el usuario', async () => {
    const res = await request(app)
      .put(`/users/${usernameTest}`)
      .send({ fullName: 'Updated User' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario actualizado correctamente');
  });

  it('Eliminar el usuario', async () => {
    const res = await request(app).delete(`/users/${usernameTest}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado correctamente');
  });

});