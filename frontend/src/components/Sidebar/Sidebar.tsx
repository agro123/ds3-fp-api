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

  // Crear el nombre completo del usuario
  const getDisplayName = () => {
    if (userName) return userName;
    
    if (user) {
      // Usar el nombre del usuario si está disponible
      if (user.name && user.name !== 'Usuario') {
        return user.name;
      }
      
      // Fallback a la estructura anterior (nombre + apellido) si existe
      if (user.nombre) {
        const firstName = user.nombre || "";
        const lastName = user.apellido || "";
        
        if (firstName && lastName) {
          return `${firstName} ${lastName}`;
        }
        return firstName;
      }
      
      // Si solo tenemos email, usar la parte local como última opción
      if (user.email) {
        return user.email.split('@')[0];
      }
    }
    
    return "Usuario";
  };

  const displayName = getDisplayName();

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
