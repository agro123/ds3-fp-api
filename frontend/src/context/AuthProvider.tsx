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
    const loadSavedAuth = async () => {
      const savedToken = localStorage.getItem('authToken');
      const savedUserData = localStorage.getItem('userData');

      if (savedToken && savedUserData) {
        try {
          const userData = JSON.parse(savedUserData);
          setToken(savedToken);
          setUser(userData);
          
          // Intentar obtener datos actualizados del usuario
          try {
            console.log('Loading complete user data for saved session:', userData.id);
            const userResponse = await fetch(`https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/users/${userData.id}`, {
              headers: {
                'Authorization': `Bearer ${savedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (userResponse.ok) {
              const completeUserData = await userResponse.json();
              console.log('Updated user data from API:', completeUserData);
              
              const updatedUserData = {
                ...userData,
                name: completeUserData.name || userData.name,
                ...completeUserData
              };
              
              setUser(updatedUserData as User);
              localStorage.setItem('userData', JSON.stringify(updatedUserData));
            }
          } catch (error) {
            console.warn('Could not refresh user data on load:', error);
          }
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          // Limpiar datos corruptos
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      setIsLoading(false);
    };

    loadSavedAuth();
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
      
      // Manejar diferentes estructuras de respuesta de la API
      // La respuesta puede venir directamente o dentro de un objeto data/user
      
      // Buscar el token en diferentes posibles ubicaciones
      const token = data.token || data.session_token || data.accessToken || data.auth_token;
      
      // Buscar los datos del usuario
      console.log('AuthProvider - Checking data structure:');
      console.log('AuthProvider - data.id:', data.id);
      console.log('AuthProvider - data.name:', data.name);
      console.log('AuthProvider - data.userId:', data.userId);
      console.log('AuthProvider - data.email:', data.email);
      console.log('AuthProvider - data.token:', data.token);
      
      // La respuesta actual de la API solo tiene: date, email, expires_at, token, userId
      // No incluye el nombre del usuario, así que usaremos el email por ahora
      const userData = {
        id: data.userId || data.id || 'unknown',
        name: data.name || data.email?.split('@')[0] || 'Usuario', // Usar parte del email como nombre temporal
        email: data.email || 'unknown@example.com',
        created_at: data.date || new Date().toISOString(),
        isAdmin: data.isAdmin || false,
        session_token: data.token,
        session_expires_at: data.expires_at || ''
      };
      
      console.log('AuthProvider - Final userData created:', userData);
      
      console.log('Extracted token:', token);
      console.log('Extracted user data:', userData);
      
      // Verificar que tenemos al menos un token
      if (!token) {
        console.error('No token found in response');
        return false;
      }
      
      console.log('Final user data to store:', userData);
      
      // Guardar en estado
      setToken(token);
      setUser(userData as User);
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Ahora obtener los datos completos del usuario desde /users/:id
      try {
        console.log('Fetching complete user data from /users/' + userData.id);
        const userResponse = await fetch(`https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/users/${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const completeUserData = await userResponse.json();
          console.log('Complete user data from /users/:id:', completeUserData);
          
          // Actualizar los datos del usuario con la información completa
          const updatedUserData = {
            ...userData,
            name: completeUserData.name || userData.name,
            // Agregar cualquier otro campo que venga del endpoint
            ...completeUserData
          };
          
          console.log('Updated user data with complete info:', updatedUserData);
          
          // Actualizar estado y localStorage con los datos completos
          setUser(updatedUserData as User);
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        } else {
          console.warn('Could not fetch complete user data, using login data only');
        }
      } catch (error) {
        console.warn('Error fetching complete user data:', error);
        // Continuar con los datos del login si falla la llamada adicional
      }
      
      console.log('User logged in successfully');
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
