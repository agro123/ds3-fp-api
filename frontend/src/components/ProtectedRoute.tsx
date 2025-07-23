import React from 'react';
import { useAuthGuard } from '../context/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthGuard();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si no está autenticado, useAuthGuard ya habrá redirigido a login
  return null;
};

export default ProtectedRoute;
