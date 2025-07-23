import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from "../../assets/logos/logo.svg";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar mensajes de error y éxito cuando el usuario empiece a escribir
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      setIsLoading(false);
      return;
    }

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      setIsLoading(false);
      return;
    }

    try {
      // Llamada al API para crear el usuario
      const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        // Intentar obtener el mensaje de error del servidor
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Error del servidor: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Usuario registrado exitosamente:', data);

      // Mostrar mensaje de éxito
      setSuccessMessage('¡Cuenta creada exitosamente! Redirigiendo al login...');
      
      // Redirigir al login después de un breve delay
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Cuenta creada exitosamente. Puedes iniciar sesión ahora.' }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la cuenta. Inténtalo de nuevo.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src={logo} alt="UniSalas Logo" />
        </div>
        <div className="register-header">
          <h1>Bienvenido a Unisalas</h1>
          <p>Crea tu cuenta para acceder al sistema de reservas</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && <div className="register-error-message">{error}</div>}
          {successMessage && <div className="register-success-message">{successMessage}</div>}

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading || !!successMessage}
          >
            {isLoading ? 'Creando cuenta...' : successMessage ? 'Redirigiendo...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
