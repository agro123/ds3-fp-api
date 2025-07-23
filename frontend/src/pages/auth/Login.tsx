import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logos/logo.svg";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implementar lógica de login con el microservicio de auth
      console.log("Login attempt:", { username, password });

      // Simulación de delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Manejar respuesta del servidor y redireccionar
    } catch {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="UniSalas Logo" />
        </div>
        <div className="login-header">
          <h1>Bienvenido a Unisalas</h1>
          <p>Ingresa tu usuario y contraseña para iniciar sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="login-error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
