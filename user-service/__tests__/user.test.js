import request from 'supertest';
import app from '../users/index.js';

describe('Microservicio de usuarios', () => {

  test('Registro de usuario', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@prueba.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuario registrado');
  });

  test('Inicio de sesión exitoso', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'login@prueba.com', password: 'abc123' });

    const res = await request(app)
      .post('/login')
      .send({ email: 'login@prueba.com', password: 'abc123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Fallo en inicio de sesión con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'login@prueba.com', password: 'incorrecta' });

    expect(res.statusCode).toBe(401);
  });

  test('Actualizar contraseña de un usuario', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'update@prueba.com', password: 'pass1' });

    const res = await request(app)
      .put('/update')
      .send({ email: 'update@prueba.com', newPassword: 'nuevaPass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Contraseña actualizada');
  });

  test('Eliminar un usuario', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'delete@prueba.com', password: 'abc123' });

    const res = await request(app)
      .delete('/delete')
      .send({ email: 'delete@prueba.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado');
  });

});