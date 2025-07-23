import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth-context';
import type { AuthContextType } from './auth-context';

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook para proteger rutas
export const useAuthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return { isAuthenticated, isLoading };
};

// Hook para prevenir acceso a login cuando ya está autenticado
export const useLoginGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return { isAuthenticated, isLoading };
};
