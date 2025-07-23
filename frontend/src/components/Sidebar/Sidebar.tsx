import React from "react";
import { useAuth } from "../../context/useAuth";
import "./Sidebar.css";
import logo from "../../assets/logos/logo.svg";

interface SidebarProps {
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userName 
}) => {
  const { user, logout } = useAuth();
  
  // Usar el nombre del usuario del contexto si no se proporciona userName
  const displayName = userName || user?.nombre || "Usuario";

  const handleSignOut = () => {
    logout(); // El contexto maneja la limpieza y redirección
  };

  return (
    <div className="sidebar">
      <div className="sidebar-overlay"></div>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="UniSalas Logo" />
          </div>
          <span>{displayName}</span>
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
