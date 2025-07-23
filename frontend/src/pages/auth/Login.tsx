import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useLoginGuard } from "../../context/useAuth";
import "./Login.css";
import logo from "../../assets/logos/logo.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  useLoginGuard(); // Redirige a /home si ya está autenticado
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Efecto para mostrar mensaje de registro exitoso
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpiar el state después de mostrar el mensaje
      navigate(location.pathname, { replace: true });
      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location, navigate]);

  // Efecto adicional para garantizar redirección después del login
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Login - Usuario autenticado, redirigiendo a /home');
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);

      if (success) {
        console.log("Login successful");
        // El contexto y useLoginGuard manejarán automáticamente la redirección
        // No necesitamos navigate("/home") aquí
      } else {
        throw new Error("Credenciales inválidas. Verifica tu email y contraseña.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al iniciar sesión. Verifica tu conexión a internet.");
      }
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
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
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

          {successMessage && <div className="login-success-message">{successMessage}</div>}
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
