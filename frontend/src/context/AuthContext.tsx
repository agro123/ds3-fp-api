import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, type User, type AuthContextType, type LoginResponse } from './auth-context';

// Provider del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar si hay datos de autenticación guardados al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUserData = localStorage.getItem('userData');

    if (savedToken && savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        setToken(savedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  // Función para hacer login con API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data: LoginResponse = await response.json();
      
      // Guardar en estado
      setToken(data.token);
      setUser(data.user);
      
      // Guardar en localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      console.log('User logged in:', data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Función para hacer logout
  const logout = () => {
    // Limpiar estado
    setToken(null);
    setUser(null);
    
    // Limpiar localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redirigir a login
    navigate('/login');
    
    console.log('User logged out');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
