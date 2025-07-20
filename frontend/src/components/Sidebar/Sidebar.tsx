import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logos/logo.svg";

interface SidebarProps {
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userName = "Usuario"
}) => {
  const handleSignOut = () => {
    // TODO: Implementar lógica de cierre de sesión completa
    // - Limpiar localStorage/sessionStorage
    // - Hacer logout en el backend
    // - Redirigir a login
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    console.log("Cerrando sesión...");
    // Redirigir a login
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-overlay"></div>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="UniSalas Logo" />
          </div>
          <span>{userName}</span>
        </div>
        <div className="sidebar-links">
          <a href="/home" className="sidebar-link">
            <span className="sidebar-icon">🏠</span>
            Inicio
          </a>
          <a href="/reservations" className="sidebar-link">
            <span className="sidebar-icon">📅</span>
            Reservas
          </a>
          <a href="/rooms" className="sidebar-link">
            <span className="sidebar-icon">🚪</span>
            Salas
          </a>
        </div>
        <button onClick={handleSignOut} className="signout-button">
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
