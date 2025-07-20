import request from 'supertest';
import app from '../users/index.js';

describe('Microservice-Users', () => {
  let userId = null;
  const emailTest = 'test@example.com';

  it('Crear un nuevo usuario', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Usuario Test',
        email: emailTest,
        password: 'password123',
        isAdmin: false
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
  });

  it('Obtener el usuario registrado', async () => {
    const res = await request(app)
      .get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.email).toBe(emailTest);
  });

  it('Actualizar el nombre y contraseña del usuario', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Usuario Actualizado',
        password: 'nuevoPassword'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario actualizado correctamente');
  });

  it('Obtener el usuario actualizado', async () => {
    const res = await request(app)
      .get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Usuario Actualizado');
  });

  it('Eliminar el usuario', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado correctamente');
  });

  it('No encuentra el usuario eliminado', async () => {
    const res = await request(app)
      .get(`/users/${userId}`);

    expect(res.statusCode).toBe(404);
  });
});
