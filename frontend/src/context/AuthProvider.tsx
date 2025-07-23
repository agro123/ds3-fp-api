import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, type User, type AuthContextType } from './auth-context';

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
      console.log('Attempting login with:', { email, password: '***' });
      
      const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('API response status:', response.status);
      console.log('API response ok:', response.ok);

      if (!response.ok) {
        console.error('API returned error status:', response.status);
        return false;
      }

      const data = await response.json();
      
      console.log('Raw API response:', data);
      console.log('Full response structure:', JSON.stringify(data, null, 2));
      
      // Manejar diferentes estructuras de respuesta
      const token = data.token || data.accessToken || data.auth_token;
      let userData = data.user || data.usuario || data.data?.user || data;
      
      console.log('Extracted token:', token);
      console.log('Extracted user data:', userData);
      
      // Verificar que tenemos al menos un token
      if (!token) {
        console.error('No token found in response');
        return false;
      }
      
      // Si no tenemos datos de usuario específicos, crear un objeto básico
      if (!userData || typeof userData !== 'object') {
        userData = {
          userId: data.userId || data.id || 'unknown',
          email: data.email || 'unknown@example.com',
          nombre: data.nombre || data.name || data.firstName || 'Usuario',
          apellido: data.apellido || data.lastname || data.lastName || '',
          plan: data.plan || data.role || 'estudiante'
        };
      } else {
        // Normalize userData to ensure it has userId instead of id
        userData = {
          userId: userData.userId || userData.id || data.userId || data.id || 'unknown',
          email: userData.email || data.email || 'unknown@example.com',
          nombre: userData.nombre || userData.name || data.nombre || data.name || 'Usuario',
          apellido: userData.apellido || userData.lastname || data.apellido || data.lastName || '',
          plan: userData.plan || userData.role || data.plan || data.role || 'estudiante'
        };
      }
      
      console.log('Final user data to store:', userData);
      
      // Guardar en estado
      setToken(token);
      setUser(userData as User);
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      console.log('User logged in successfully:', userData);
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
    isAuthenticated: !!(token && user),
    isLoading,
    login,
    logout,
  };

  // Debug log para verificar el estado
  console.log('AuthProvider state:', {
    hasToken: !!token,
    hasUser: !!user,
    userObj: user,
    isAuthenticated: !!(token && user)
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
